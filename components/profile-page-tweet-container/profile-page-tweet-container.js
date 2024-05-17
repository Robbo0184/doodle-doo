import styled from "styled-components";
import DeleteButton from "../profile-page-delete-button/profile-page-delete-buton";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { formatPostAge } from "@/utils/createCommentTweetAge";
import CommentContainer from "../comment-container/comment-container";
import ToggleCommentsButton from "../toggle-comments-button/toggle-comments-button";
import AddCommentButton from "../add-comment-button/add-comment-button";
import LikeButton from "../like-button/like-button";
import React, { useState, useEffect } from "react";

const StyledLi = styled.li`
border: 2px solid #CCCCCC;
align-items: center;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  font-family: 'Playpen Sans', sans-serif;
  margin: 1rem;
  max-width: 40vw;
  list-style-type: none;
  position: relative; 
  transition: box-shadow 0.3s ease;   display: flex;
  flex-direction: column;
  gap: 1rem;
  
  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
 
  &:hover .delete-button {
    opacity: 1;
  }
  
  .delete-button {
    opacity: 0;
    transition: opacity 0.5s ease;
    position: absolute;
    top: -0.5rem;
    right: -2.2rem;
    background-color: #CCCCCC; 
    color: #333;
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
    cursor: pointer;
  }

  @media screen and (max-width: 500px){
    padding: 1rem;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 1rem;
    max-width: 65vw;
  }
`;

const LikeLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: inherit; 

  @media (min-width: 501px) {
    pointer-events: none;
  }
`;

export default function ProfilePageTweetContainer({
  user,
  mutate,
  setTweetId,
  isNarrowScreen,
  handleDeleteTweet,
  visibleComments,
  toggleComments,
  handleAddCommentClick,
  setShowCommentModal,
  handleDeleteComment,
  handleToggleLikes }) {


  const { data: session } = useSession();
  const router = useRouter();
  const { id: userId } = router.query;

  let sortedTweets = [];

  if (user) {
    sortedTweets = user.tweets.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  return (
    <>

      {sortedTweets.length > 0 ? (
        sortedTweets.map((tweet) => {
          const formattedDate = new Date(tweet.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });

          return (
            <div key={tweet._id}>
              <StyledLi

              >
                {tweet.tweet}
                {tweet.image && (
                  <Image
                    id="profilePageImage"
                    src={tweet.image}
                    style={{ borderRadius: '15px' }}
                    width={400}
                    height={250}
                    alt="tweet image"
                  />
                )}
                {' '} - {formatPostAge(tweet.date)}
                <LikeButton
                  className="like--button"
                  isLiked={tweet.likes.includes(userId)}
                  tweetId={tweet._id}
                  handleToggleLikes={() => handleToggleLikes(tweet._id, userId)}
                />
                {isNarrowScreen && tweet.likes.length > 0 ? (
                  <LikeLink href={`/users/${user._id}/tweet/${tweet._id}/likes`}>
                    {tweet.likes?.length === 1 ? '1 like' : `${tweet.likes?.length} likes`}
                  </LikeLink>
                ) : (
                  <p>{tweet.likes?.length === 1 ? '1 like' : `${tweet.likes?.length} likes`}</p>
                )}
                {session?.user?.userId === userId && (
                  <DeleteButton
                    className="delete-button"
                    handleDeleteTweet={() => handleDeleteTweet(tweet._id, userId)}
                    tweetId={tweet._id}
                  >
                    ❌
                  </DeleteButton>
                )}
                <div id="commentButtonsDiv">
                  {tweet.comments.length > 0 && (
                    <ToggleCommentsButton toggleComments={toggleComments} tweet={tweet} />
                  )}
                  <AddCommentButton
                    tweet={tweet}
                    onClick={() => handleAddCommentClick(tweet._id, setTweetId, setShowCommentModal)}
                    setTweetId={setTweetId}
                  /> </div>
                {visibleComments[tweet._id] &&
                  tweet.comments.map((comment, index) => (
                    <CommentContainer
                      mutate={mutate}
                      user={user}
                      key={index}
                      userId={userId}
                      tweet={tweet}
                      comment={comment}
                      handleDeleteComment={handleDeleteComment}
                    />
                  ))}

              </StyledLi>
            </div>
          );
        })
      ) : <p id="noDoodleDooMessageProfilePage">No doodle doos to display...</p>}
    </>
  );
}