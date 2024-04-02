import styled from "styled-components";

const StyledButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ddd; 
  color: #555; 
  border: none;
  border-radius: 50%;
  padding: 0.2rem 0.4rem;
  cursor: pointer;
  
  transition: opacity 0.3s ease-in-out;

  @media screen and (max-width: 500px) {
    opacity: 1;
    pointer-events: auto;
    transition: none;
    padding: 0.1rem 0.2rem;
    
  }
`;

export default function DeleteButton({ className, handleDeleteBio, userId, handleDeleteTweet, tweetId }) {
  const handleDeleteClick = () => {
    if (userId) {
      handleDeleteBio(userId);
    } else {
      handleDeleteTweet(tweetId);
    }
  }

  return (
    <>
      <StyledButton type="button"
        className={className}
        onClick={handleDeleteClick}> ❌</StyledButton>
    </>
  )
}