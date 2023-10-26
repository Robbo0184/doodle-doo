import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import SignIn from "../../components/sign-in/sign-in";
import AuthButton from "../../components/auth-button/AuthButton";
import styled from "styled-components";
import LikeButton from "../../components/like-button/like-button";
import CommentModal from "../../components/comment-modal/comment-modal";
import { useRouter } from "next/router";
import DoodleDooLogo from "../../public/assets/doodledoo.png"
import Image from "next/image";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  min-height: 50vh;
  line-height: 2rem;
  padding-top: 0.5rem;
  gap: 1rem;
`;

const StyledLi = styled.li`
   border: 0.2rem solid white;
   box-shadow: 0 0 0 0.1rem blue;
   border-radius: 15%;
   padding: 0.5rem;
   margin: 1rem;
   max-width: 30vw;
   position: relative;
   list-style-type: none;
`;
// const StyledImg = styled.img`
//     border-radius: 15%;
//     width: 100px;
//     height: 200px;
// `

export default function Home() {
  const { data: users, isLoading, isError, mutate } = useSWR("/api/users");
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [getTweetId, setTweetId] = useState("")
  const router = useRouter()

  const toggleComments = (tweetId) => {
    setVisibleComments((prevComments) => ({
      ...prevComments,
      [tweetId]: !prevComments[tweetId],
    }));
  };

  const userId = session?.user?.userId;
  const userName = session?.user?.name;

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
    console.log("response:", response);

  }


  async function handleDeleteComment(commentId, tweetId) {

    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: tweetId }),
    });
    mutate()
    console.log("response:", response);

  }

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (isError || users === undefined) {
    return <div>Error loading users data</div>;
  }

  return (
    <>
      <StyledDiv>
        <Image src={DoodleDooLogo} width={200} alt="logo" />
        {session ? (
          <>
            <h1>Hiya {userName}.</h1>
            <ul>
              {users.map((user) => {
                if (user.tweets && user.tweets.length > 0) {
                  return user.tweets.map((tweet) => (
                    <StyledLi key={tweet._id}>
                      {tweet.tweet} {tweet.userName}
                      {tweet.likes?.length}<p>likes</p>
                      {tweet.comments.length > 0 && (
                        <div>
                          <button onClick={() => toggleComments(tweet._id)}>
                            {visibleComments[tweet._id] ? "Hide" : "Show"} Comments
                          </button>
                          {visibleComments[tweet._id] &&
                            tweet.comments.map((comment, index) => (
                              <div key={index}>
                                {comment.comment} - {comment.userName}
                                {session?.user?.name === comment.userName && (
                                  <button type="button" onClick={() => handleDeleteComment(comment._id, tweet._id)}> ❌</button>
                                )}

                              </div>
                            ))}
                        </div>
                      )}
                      <LikeButton
                        isLiked={tweet.likes.includes(userId)}
                        tweetId={tweet._id}
                        handleToggleLikes={handleToggleLikes}
                      />
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setTweetId(tweet._id);
                        }}
                      >
                        Add comment
                      </button>
                      {session?.user?.name === tweet.userName && (
                        <button type="button" onClick={() => handleDeleteTweet(tweet._id)}> ❌</button>
                      )}
                    </StyledLi>
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
      </StyledDiv>
      <Navbar />
      <AuthButton />
    </>
  );
}

