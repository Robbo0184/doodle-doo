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
import DoodleDooLogo from "../../public/assets/hen.png"
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
  margin-bottom: 40px;
  


`;

const StyledLi = styled.li`
   border: 2px solid #CCCCCC;
   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
   border-radius: 20%;
   padding: 0.9rem;
   margin: 1rem;
   max-width: 30vw;
   font-family: 'Playpen Sans', sans-serif;
   position: relative;
   list-style-type: none;
   transition: box-shadow 0.3s ease; 
   &:hover {
     box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
   }
 
`;

const StyledButton = styled.button`
   background-color: #3498db; 
   color: #fff; 
   border: none;
   border-radius: 0.5rem; 
   padding: 0.5rem 1rem;
   margin-right: 1rem; 
   cursor: pointer;
   transition: background-color 0.3s ease; 

   &:hover {
      background-color: #2980b9; 
   }
`;

const CommentContainer = styled.div`
  margin-bottom: 0.5rem; /* Add margin to create space between comments */
`;

const DeleteButton = styled.button`
  background-color: transparent;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #ccc;
    color: #fff;
  }
`;


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
        <Image className="main--feed--logo" src={DoodleDooLogo} width={140} alt="logo" />
        {session ? (
          <>
            <h1 className="homepage--header">Hiya {userName}.</h1>
            <ul>
              {users.map((user) => {
                if (user.tweets && user.tweets.length > 0) {
                  return user.tweets.map((tweet) => (
                    <StyledLi key={tweet._id}>
                      {tweet.tweet} <br></br> {tweet.userName}<br></br>
                      {tweet.likes?.length === 1 ? (
                        <p>1 like</p>
                      ) : (
                        <p>{tweet.likes?.length} likes</p>
                      )}
                      {tweet.comments.length > 0 && (
                        <>
                          <StyledButton onClick={() => toggleComments(tweet._id)}>
                            {visibleComments[tweet._id] ? "Hide" : "Show"} Comments
                          </StyledButton>
                          {visibleComments[tweet._id] &&
                            tweet.comments.map((comment, index) => (
                              <CommentContainer key={index}>
                                {comment.comment} - {comment.userName}
                                {session?.user?.name === comment.userName && (
                                  <DeleteButton type="button" onClick={() => handleDeleteComment(comment._id, tweet._id)}> ❌</DeleteButton>
                                )}
                              </CommentContainer>
                            ))}
                        </>
                      )}
                      <LikeButton
                        className="like--button"
                        isLiked={tweet.likes.includes(userId)}
                        tweetId={tweet._id}
                        handleToggleLikes={handleToggleLikes}
                      />
                      <StyledButton
                        onClick={() => {
                          setShowModal(true);
                          setTweetId(tweet._id);
                        }}
                      >
                        Add comment
                      </StyledButton>
                      {session?.user?.name === tweet.userName && (
                        <DeleteButton type="button" onClick={() => handleDeleteTweet(tweet._id)}> ❌</DeleteButton>
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
      <AuthButton />
      {session && <Navbar />}
    </>
  );
}

