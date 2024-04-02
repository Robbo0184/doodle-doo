import React from "react";
import styled from "styled-components";
import Image from "next/image";
import likeIconEmpty from "../../public/assets/like-icon-empty.svg";
import likeIconFull from "../../public/assets/like-icon-filled.svg";
import { useSession } from "next-auth/react";

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

export default function LikeButton({ tweetId, isLiked, handleToggleLikes }) {
  // const { data: session } = useSession();

  const toggleLike = () => {
    handleToggleLikes(tweetId);
  };

  return (
    <StyledButton onClick={toggleLike}>
      {isLiked ? (
        <Image src={likeIconFull} alt="filled like icon" width={20} height={20} />
      ) : (
        <Image src={likeIconEmpty} alt="empty like icon" width={20} height={20} />
      )}
    </StyledButton>
  );
}
