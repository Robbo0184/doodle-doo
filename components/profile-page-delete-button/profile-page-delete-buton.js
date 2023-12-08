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
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  .user--bio-container:hover & {
    opacity: 1;
  }

  opacity: ${({ showonhover }) => (showonhover ? '1' : '0')};
  pointer-events: ${({ showonhover }) => (showonhover ? 'auto' : 'none')};
  visibility: ${({ showonhover }) => (showonhover ? 'visible' : 'hidden')};

  &:hover,
  &:focus {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
  }

  @media screen and (max-width: 500px) {
    opacity: 1;
    pointer-events: auto;
    transition: none;
    padding: 0.1rem 0.2rem;
    
  }
`;

export default function DeleteButton({ showonhover, handleDeleteBio, userId, handleDeleteTweet, tweetId }) {
    const handleDeleteClick = () => {
        if (userId) {
            handleDeleteBio(userId);
        } else {
            handleDeleteTweet(tweetId);
        }
    }

    return (
        <>
            <StyledButton type="button" showonhover={showonhover} onClick={handleDeleteClick}> ❌</StyledButton>
        </>
    )
}