import styled from "styled-components";
import DeleteButton from "../homepage-delete-button/homepage-delete-button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { formatPostAge } from "@/utils/createCommentTweetAge";
import Image from "next/image";

const StyledDiv = styled.div`
  margin-bottom: 0.3rem; 
  position: relative;
  margin-top: 1rem;
  padding-inline: 2rem;

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
  }

  #commentContainerUserName {
    position: relative;
    top: -0.8rem; 
    left: 0.7rem;
    
    color: #555;
  }

  #tweetPageCommentContainerSpan > div {
    font-weight: 400;  
    
  }

  @media screen and (max-width: 500px) {
    .delete-button {
        opacity: 1;
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

  `;



export default function CommentContainer({ comment, handleDeleteComment, index, tweet, userId }) {
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
