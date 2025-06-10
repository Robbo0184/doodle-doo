import styled from "styled-components";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { formatPostAge } from "@/utils/createCommentTweetAge";
import LikeButton from "../like-button/like-button";
import CommentButton from "../comment-on-comment-button/comment-button";
import DeleteButton from "../homepage-delete-button/homepage-delete-button";

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
  position: relative;
  flex-direction: column;
  width: 40vw;
  align-items: flex-start;
  cursor: pointer;
  border: 0.2px solid #e0e0e0;   
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0.8rem 1rem;
  font-family: "Playpen Sans", sans-serif;
  margin-bottom: 15px;
  
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
  
  #nestedCommentUserName {
    margin-left: 0.5rem; 
  }
`;

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

const NestedCommentsContainer = styled.div`
  
`;

export default function NestedCommentContainer({
  nestedComment,
  tweetId,
  userId,
  handleToggleLikes,
  handleDeleteComment,
  openCommentModal
}) {
  const { data: session } = useSession();

  if (!nestedComment || !nestedComment.commentUserId) {
    return null;
  }

  const isLiked = nestedComment.likes?.includes(userId);

  return (
    <>
      <StyledDiv key={nestedComment._id}>
        <UserInfo>
          <Link
            id="commentProfilePageLink"
            href={`/users/${nestedComment.commentUserId._id}`}
          >
            <Image
              id="commentContainerUserIcon"
              src={nestedComment.commentUserId.image}
              style={{ borderRadius: "50px" }}
              height={40}
              width={40}
              alt="user-image"
            />
            <span id="nestedCommentUserName">
              {nestedComment.commentUserId.name}
            </span>
          </Link>
          <DateDisplay>{formatPostAge(nestedComment.date)}</DateDisplay>
        </UserInfo>

        <span id="tweetPageCommentContainerSpan">
          <div>{nestedComment.comment}</div>
        </span>

        <LikeContainer>
          <LikeButton
            userId={userId}
            isLiked={isLiked}
            commentId={nestedComment._id}
            tweetId={tweetId}
            handleToggleLikes={() => handleToggleLikes(tweetId, userId, nestedComment._id)}
          />
          <span>
            {nestedComment.likes?.length || 0} likes
          </span>
          <CommentButton
            commentId={nestedComment._id}
            onClick={() => openCommentModal(nestedComment._id)}
          />
        </LikeContainer>

        {session?.user?.name === nestedComment?.commentUserId?.name && (
          <DeleteButtonContainer>
            <StyledDeleteButton
              className="nestedComment--container--delete--button"
              handleDeleteComment={() => handleDeleteComment(
                nestedComment._id,
                tweetId,
                userId,
                nestedComment.parentCommentId
              )}
              commentId={nestedComment._id}
              userId={userId}
            >
              ❌
            </StyledDeleteButton>
          </DeleteButtonContainer>
        )}
      </StyledDiv>
      
      {nestedComment.comments && nestedComment.comments.length > 0 && (
        <NestedCommentsContainer>
          {nestedComment.comments.map((childComment) => (
            <NestedCommentContainer
              key={childComment._id}
              nestedComment={childComment}
              tweetId={tweetId}
              userId={userId}
              handleToggleLikes={handleToggleLikes}
              handleDeleteComment={handleDeleteComment}
              openCommentModal={openCommentModal}
            />
          ))}
        </NestedCommentsContainer>
      )}
    </>
  );
}