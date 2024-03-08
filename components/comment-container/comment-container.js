import styled from "styled-components";
import DeleteButton from "../homepage-delete-button/homepage-delete-button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const StyledDiv = styled.div`
  margin-bottom: 0.3rem; 
  position: relative;
  margin-top: 0.5rem;
  padding-inline: 2rem;

`;

const DeleteButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: -0.5rem;
`;

export default function CommentContainer({ comment, handleDeleteComment, index, tweet, user }) {
    const { data: session } = useSession();
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    console.log('comment.commentUserId:', comment.commentUserId); 
    return (
        <>
            <StyledDiv onMouseEnter={() => setShowDeleteButton(true)} onMouseLeave={() => setShowDeleteButton(false)} key={index}>
                <span>
                    {comment.comment} -
                    <Link href={`/users/${comment.commentUserId}`}>{comment.userName}</Link>
                </span>
                {session?.user?.name === comment.userName && (
                    <DeleteButtonContainer>
                        <DeleteButton showonhover={showDeleteButton} handleDeleteComment={handleDeleteComment} commentId={comment._id} tweetId={tweet._id} > ❌
                        </DeleteButton>
                    </DeleteButtonContainer>
                )}
            </StyledDiv>
        </>
    )
}