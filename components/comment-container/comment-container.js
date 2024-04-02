import styled from "styled-components";
import DeleteButton from "../homepage-delete-button/homepage-delete-button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { formatPostAge } from "@/utils/createCommentTweetAge";

const StyledDiv = styled.div`
  margin-bottom: 0.3rem; 
  position: relative;
  margin-top: 0.5rem;
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

export default function CommentContainer({ comment, handleDeleteComment, index, tweet, user }) {
    const { data: session } = useSession();
    
    return (
        <>
            <StyledDiv id="commentContainer"  key={index}>
                <span id="tweetPageCommentContainerSpan">
                    {comment.comment} - <br></br>
                    <Link id="commentProfilePageLink" href={`/users/${comment.commentUserId}`}>{comment.userName} {formatPostAge(comment.date)}</Link>
                </span>
                {session?.user?.name === comment.userName && (
                    <DeleteButtonContainer>
                        <DeleteButton className="delete-button" handleDeleteComment={handleDeleteComment} commentId={comment._id} tweetId={tweet._id} > ❌
                        </DeleteButton>
                    </DeleteButtonContainer>
                )}
            </StyledDiv>
        </>
    )
}