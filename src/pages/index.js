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
import { handleToggleLikes } from "@/utils/handleToggleLikes";
import { handleDeleteComment } from "@/utils/handleDeleteComment";
import { handleAddCommentClick } from "@/utils/handleAddCommentClick";
import { handleDeleteTweet } from "@/utils/handleDeleteTweet";


export default function Home() {
  const { data: users, isLoading, isError, mutate } = useSWR("/api/users");
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [getTweetId, setTweetId] = useState('');

  const toggleComments = (tweetId) => {
    setVisibleComments((prevComments) => ({
      ...prevComments,
      [tweetId]: !prevComments[tweetId],
    }));
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
              {allTweets.map((tweet) => (
                <TweetContainer
                  key={tweet._id}
                  tweet={tweet}
                  user={users.find((user) =>
                    user.tweets.some((t) => t._id === tweet._id)
                  )}
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
              ))}

              {showModal && allTweets ? (
                <CommentModal
                  tweetId={getTweetId}
                  onClose={() => setShowModal(false)}
                />
              ) : null}

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

