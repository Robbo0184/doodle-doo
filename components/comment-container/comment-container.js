import styled from "styled-components";
import DeleteButton from "../homepage-delete-button/homepage-delete-button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { formatPostAge } from "@/utils/createCommentTweetAge";
import Image from "next/image";
import LikeButton from "../like-button/like-button";
import LikeLink from "../like-link/like-link";


const StyledDiv = styled.div`
  margin-bottom: 0.3rem; 
  position: relative;
  margin-top: 1.2rem;
  padding-inline: 2rem;
  border: 2px solid #e0e0e0; 
  border-radius: 10px; 
  background-color: #fafafa; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  padding: 30px 60px; 
  margin: 20px 0; 
  

  @media screen and (max-width: 500px) {
    padding: 20px 50px; 
    margin: 10px 0; 
    padding-inline: 1rem;
    font-size: 0.9rem; 
    min-width: 52vw;
    margin-top: 1.6rem;
  }

  &:hover .delete-button {
    opacity: 1;
  }
  
  .delete-button {
    opacity: 0;
    transition: opacity 0.5s ease;
    position: absolute;
    top: 0;
    right: 0;
    background-color: #CCCCCC; 
    color: #333;
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
    cursor: pointer;

    @media screen and (max-width: 500px) {
      font-size: 0.6rem;
      padding: 0.2rem 0.4rem;
      right: 2rem;
    }
  }

  #commentContainerUserName {
    position: relative;
    top: -0.8rem; 
    left: 0.7rem;
    color: #555;
  }

  #tweetPageCommentContainerSpan > div:first-child {
    font-weight: 400;
    margin-top: -18px; 
  }

  #tweetPageCommentContainerSpan > div:nth-child(2) {
    margin-top: 2px; 
  }
  

  @media screen and (max-width: 500px) {
    .delete-button {
        opacity: 1;
    }
  }

 `;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;

  p, a {
    margin-left: 0.7rem;
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
  right: -2rem;
  
`;

const ImageWrapper = styled.div`
  margin-left: -3.5rem; 
  margin-bottom: -0.2rem;
  position: relative;
  top: -12px; 

  `;



export default function CommentContainer({ comment, handleDeleteComment, index, tweet, userId, isNarrowScreen, handleToggleLikes, user }) {
  const { data: session } = useSession();

  return (
    <>

      <StyledDiv id="commentContainer" key={index}>
        <ImageWrapper>
          <Link id="commentProfilePageLink" href={`/users/${comment.commentUserId._id}`}>
            <Image id="commentContainerUserIcon" src={comment.commentUserId.image} style={{ borderRadius: '50px' }} height={40} width={40} alt="user-image" />
            <span id="commentContainerUserName">{comment.userName}</span>
          </Link>
        </ImageWrapper>
        <span id="tweetPageCommentContainerSpan">
          <div>{comment.comment}</div>
          <div>{formatPostAge(comment.date)}</div>
        </span>
        <LikeContainer>
          <LikeButton
            userId={userId}
            className="like--button"
            isLiked={comment.likes.includes(userId)}
            commentId={comment._id}
            handleToggleLikes={handleToggleLikes} />
          {isNarrowScreen && comment?.likes.length > 0 ? (
            <LikeLink href={`users/${user._id}/tweet/${tweet._id}/comment/${comment._id}/likes`}>
              {comment.likes?.length === 1 ? '1 like' : `${comment.likes?.length} likes`}
            </LikeLink>
          ) : (
            <p>{comment.likes?.length === 1 ? '1 like' : `${comment.likes?.length} likes`}</p>
          )}
        </LikeContainer>
        {session?.user?.name === comment.userName && (
          <DeleteButtonContainer>
            <DeleteButton className="delete-button" handleDeleteComment={handleDeleteComment} commentId={comment._id} tweetId={tweet._id} userId={userId}  > ❌
            </DeleteButton>
          </DeleteButtonContainer>
        )}
      </StyledDiv>

    </>
  )
}
