import styled from "styled-components";
import Image from "next/image";
import addCommentButton from "../../public/assets/add-comment-to-comment.svg"
import { useState } from "react";

export const StyledButton = styled.button`
  border: none;
  background-color: white;
  cursor: pointer; 
  transition: transform 0.3s ease; 

  &:hover {  
    cursor: grab; 
    transform: scale(1.5);
  }
}
  
`;

export default function CommentButton({ commentId, onClick }) {
  console.log("logging commentId", commentId);
  return (
    <StyledButton onClick={() => onClick(commentId)}>
      <Image src={addCommentButton} alt="Add comment" width={20} height={20} />
    </StyledButton>
  );
}