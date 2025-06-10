import styled from "styled-components";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import DeleteButton from "../homepage-delete-button/homepage-delete-button";
import LikeButton from "../like-button/like-button";
import LikeLink from "../like-link/like-link";
import CommentButton from "../comment-on-comment-button/comment-button";
import CommentModal from "../comment-modal/comment-modal";


const StyledDeleteButton = styled(DeleteButton)`
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #cccccc;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;
  cursor: pointer;
  
  @media screen and (max-width: 500px) {
    opacity: 1;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 40vw;
  cursor: pointer;
  border: 0.2px solid #e0e0e0;   
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0.8rem 1rem;
  font-family: "Playpen Sans", sans-serif;
  
  
  &:hover ${StyledDeleteButton} {
    opacity: 1;
    }
    
    @media screen and (max-width: 500px) {
      padding: 20px 50px;
      margin: 10px 0;
      padding-inline: 1rem;
      font-size: 0.9rem;
      min-width: 52vw;
      margin-top: 1.6rem;
      }
      
      #tweetPageCommentContainerSpan {
        margin-left: 3.2rem;
        margin-top: -0.2rem;
        font-size: 1.2rem;
        }
        
        }
        `;

const UserInfo = styled.div`
        display: flex;
        gap: 0.5rem;
        width: 100%;
        
        
        a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
          }
          
          #commentContainerUserName {
            margin-left: 0.5rem; 
            }
          `

const DateDisplay = styled.small`
            display: flex;
            align-self: center; 
            
            `;

const LikeContainer = styled.div`
            display: flex;
            width: 100%;
            margin-top: 0.4rem;
            gap: 1rem;
            margin-left: 3rem; 
            
  
            p,
            a {
    
             font-size: 1rem;
             color: #555;

             @media screen and (max-width: 500px) {
            font-size: 0.9rem;
    }
  }
`;

const DeleteButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: -1rem;
`;



export default function CommentContainer({
  comment,
  handleDeleteComment,
  index,
  formatPostAge,
  tweet,
  userId,
  isNarrowScreen,
  handleToggleLikes,
  user,
  showCommentModal,
  setShowCommentModal,
  currentCommentId,
  setCurrentCommentId
}) {
  const { data: session } = useSession();

  const isLiked = Array.isArray(comment?.likes) && comment?.likes.length > 0
    ? typeof comment.likes[0] === "string"
      ? comment.likes.includes(userId)
      : comment.likes.some((like) => like._id === userId)
    : false;

  if (!comment || !comment.commentUserId) {
    return null;
  }

  const openCommentModal = (commentId) => {
    setCurrentCommentId(commentId);
    setShowCommentModal(true);
  };

  return (
    <>
      <StyledDiv id="commentContainer" key={index}>
        <UserInfo>
          <Link
            id="commentProfilePageLink"
            href={`/users/${comment.commentUserId._id}`}
          >
            <Image
              id="commentContainerUserIcon"
              src={comment.commentUserId.image}
              style={{ borderRadius: "50px" }}
              height={40}
              width={40}
              alt="user-image"
            />
            <span id="commentContainerUserName">
              {comment.userName}
            </span>
          </Link>
          <DateDisplay>{formatPostAge(comment.date)}</DateDisplay>
        </UserInfo>

        <span id="tweetPageCommentContainerSpan">
          <div>{comment.comment}</div>

        </span>

        <LikeContainer>
          <LikeButton
            tweetId={tweet._id}
            userId={userId}
            className="like--button"
            isLiked={isLiked}
            commentId={comment._id}
            handleToggleLikes={() => handleToggleLikes(tweet._id, userId, comment._id)}
          />
          {isNarrowScreen && comment?.likes.length > 0 ? (
            <LikeLink href={`users/${user._id}/tweet/${tweet._id}/comment/${comment._id}/likes`}>
              {comment.likes?.length === 1 ? "1 like" : `${comment.likes?.length} likes`}
            </LikeLink>
          ) : (
            <p>
              {comment.likes?.length === 1 ? "1 like" : `${comment.likes?.length} likes`}
            </p>
          )}
          <CommentButton
            commentId={comment._id}
            onClick={() => openCommentModal(comment._id)}
          />
        </LikeContainer>

        {session?.user?.name === comment.userName && (
          <DeleteButtonContainer>
            <StyledDeleteButton
              className="comment--container--delete--button"
              handleDeleteComment={handleDeleteComment}
              commentId={comment._id}
              tweetId={tweet._id}
              userId={userId}
            >
              ❌
            </StyledDeleteButton>
          </DeleteButtonContainer>
        )}
      </StyledDiv>

      {showCommentModal && (
        <CommentModal
          commentId={currentCommentId}
          tweetId={tweet._id}
          onClose={() => setShowCommentModal(false)}
        />
      )}
    </>
  );
}