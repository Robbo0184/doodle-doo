import React, { useState } from "react";
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

export default function Home() {
  const { data: users, isLoading, isError, mutate } = useSWR("/api/users");
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [getTweetId, setTweetId] = useState("")
  const toggleComments = (tweetId) => {
    setVisibleComments((prevComments) => ({
      ...prevComments,
      [tweetId]: !prevComments[tweetId],
    }));
  };

  const userId = session?.user?.userId;

  async function handleToggleLikes(tweetId) {
    const response = await fetch(`/api/tweets/${tweetId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    });
    if (response.ok) {
      await response.json();
      mutate();
    }
  }

  async function handleDeleteTweet(tweetId) {
    const response = await fetch(`/api/tweets/${tweetId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });
    mutate()
  }

  const handleAddCommentClick = (tweetId) => {
    setShowModal(true);
    setTweetId(tweetId);
  };

  async function handleDeleteComment(commentId, tweetId) {

    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: tweetId }),
    });
    mutate()
  }

  if (isLoading) {
    return <div>...Loading</div>;
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
              {users.map((user) => {
                if (user.tweets.length > 0) {
                  return user.tweets.map((tweet) => (
                    <TweetContainer
                      key={tweet._id}
                      tweet={tweet}
                      user={user}
                      userId={userId}
                      handleToggleLikes={handleToggleLikes}
                      handleAddCommentClick={handleAddCommentClick}
                      toggleComments={toggleComments}
                      visibleComments={visibleComments}
                      handleDeleteComment={handleDeleteComment}
                      handleDeleteTweet={handleDeleteTweet}
                      session={session}
                    />
                  ));
                }
              })}
              {showModal && (
                <CommentModal
                  tweetId={getTweetId}
                  onClose={() => setShowModal(false)}
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

