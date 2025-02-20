import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import SignIn from "../../components/sign-in/sign-in";
import AuthButton from "../../components/auth-button/AuthButton";
import CommentModal from "../../components/comment-modal/comment-modal";
import DoodleDooLogo from "../../public/assets/hen.png"
import Image from "next/image";
import TweetContainer from "../../components/tweet-container/tweet-container";
import HomepageMainDiv from "../../components/homepage-main-div/homepage-main-div";
import CommentContainer from "../../components/comment-container/comment-container";
import NestedCommentContainer from "../../components/nested-comment-container/nested-comment-container";
import { handleToggleLikes } from "@/utils/handleToggleLikes";
import { handleDeleteComment } from "@/utils/handleDeleteComment";
import { handleAddCommentClick } from "@/utils/handleAddCommentClick";
import { handleDeleteTweet } from "@/utils/handleDeleteTweet";
import { formatPostAge } from "@/utils/createCommentTweetAge";
import styled from "styled-components";

const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export default function Home() {
  const { data: users, isLoading, isError, mutate } = useSWR("/api/users");
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [getTweetId, setTweetId] = useState('');
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [showNestedCommentModal, setShowNestedCommentModal] = useState(false);

  const toggleComments = (tweetId) => {
    setVisibleComments((prevComments) => ({
      ...prevComments,
      [tweetId]: !prevComments[tweetId],
    }));
  };

  const openCommentModal = (commentId, tweetId) => {
    setCurrentCommentId(commentId);
    setTweetId(tweetId); 
    setShowCommentModal(true);
  };

  const userId = session?.user?.userId;

  let allTweets = [];

  if (users) {
    allTweets = users.reduce((tweets, user) => {
      tweets.push(...user.tweets);
      return tweets;
    }, []);

    allTweets.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  useEffect(() => {
    const currentTweetId = sessionStorage.getItem('currentTweetId');
    const tweetElement = document.getElementById(`tweet-${currentTweetId}`);
    if (tweetElement) {
      tweetElement.scrollIntoView({ behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsNarrowScreen(window.innerWidth < 500);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <div id="isLoadingText">...Loading</div>;
  }

  if (isError || users === undefined) {
    return <div>Error loading users data</div>;
  }

  return (
    <>
      <HomepageMainDiv>
        <Image className="main--feed--logo" src={DoodleDooLogo} width={140} alt="logo" />
        {session ? (
          <>
            <h1 className="homepage--header">Whats Happening</h1>
            <ul>
              {allTweets.map((tweet) => {
                const tweetUser = users.find((user) =>
                  user.tweets.some((t) => t._id === tweet._id)
                );

                return (
                  <React.Fragment key={tweet._id}>
                    <TweetContainer
                      tweet={tweet}
                      user={tweetUser}
                      userId={userId}
                      handleToggleLikes={handleToggleLikes}
                      handleAddCommentClick={() => handleAddCommentClick(tweet._id, setTweetId, setShowModal)}
                      toggleComments={toggleComments}
                      visibleComments={visibleComments}
                      handleDeleteComment={handleDeleteComment}
                      handleDeleteTweet={handleDeleteTweet}
                      session={session}
                      setTweetId={setTweetId}
                      isNarrowScreen={isNarrowScreen}
                    />

                    {visibleComments[tweet._id] && (
                      <CommentsWrapper>
                        {tweet.comments.map((comment) => (
                          <React.Fragment key={comment._id}>
                            <CommentContainer
                              formatPostAge={formatPostAge}
                              user={tweetUser}
                              setTweetId={setTweetId}
                              isNarrowScreen={isNarrowScreen}
                              handleDeleteComment={handleDeleteComment}
                              tweet={tweet}
                              comment={comment}
                              userId={userId}
                              handleToggleLikes={() => handleToggleLikes(tweet._id, userId, comment._id)}
                              showCommentModal={showCommentModal}
                              setShowCommentModal={setShowCommentModal}
                              currentCommentId={currentCommentId}
                              setCurrentCommentId={setCurrentCommentId}
                            />

                            {comment.comments && comment.comments.length > 0 &&
                              comment.comments.map((nestedComment) => (
                                <NestedCommentContainer
                                  key={nestedComment._id}
                                  comment={comment}
                                  nestedComment={nestedComment}
                                  handleToggleLikes={handleToggleLikes}
                                  handleDeleteComment={handleDeleteComment}
                                  userId={userId}
                                  tweetId={tweet._id}
                                  openCommentModal={(commentId) => openCommentModal(commentId, tweet._id)}                                />
                              ))
                            }
                          </React.Fragment>
                        ))}
                      </CommentsWrapper>
                    )}
                  </React.Fragment>
                );
              })}

              {showModal && (
                <CommentModal
                  tweetId={getTweetId}
                  onClose={() => setShowModal(false)}
                />
              )}
              {showNestedCommentModal && (
                <CommentModal
                  commentId={currentCommentId}
                  tweetId={getTweetId}
                  onClose={() => setShowNestedCommentModal(false)}
                />
              )}
            </ul>
          </>
        ) : (
          <SignIn />
        )}
      </HomepageMainDiv>
      <AuthButton />
      {session && <Navbar />}
    </>
  );
}