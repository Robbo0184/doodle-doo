import styled from "styled-components";
import { useState } from "react";

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

   @media screen and (max-width: 500px){
    font-size: 0.7rem;
    padding: 0.3rem
   }
`;

export default function ToggleCommentsButton({ tweet, toggleComments }) {
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible((prev) => !prev);
        toggleComments(tweet._id);
    };

    return (
        <StyledButton onClick={handleClick}>
            {isVisible ? "Hide" : "Show"} Comments
        </StyledButton>
    );
}