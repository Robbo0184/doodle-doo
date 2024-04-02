import styled from "styled-components";
import { useState } from "react";

const StyledButton = styled.button`
   background: linear-gradient(to right, #48b1e2, #2696c4);   color: #fff;
   color: #fff; 
   border: none;
   border-radius: 0.5rem; 
   padding: 0.5rem 1rem;
   margin-right: 1rem; 
   cursor: pointer;
   transition: transform 0.5s ease; 
   
   &:hover {
    transform: scale(1.05); 
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