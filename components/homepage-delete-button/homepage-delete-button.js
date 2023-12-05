import styled from "styled-components"


const StyledButton = styled.button`
  background-color: #CCCCCC;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  cursor: pointer;
  transition: opacity 0.5s ease, height 0.5s ease;  
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  pointer-events: none;
  
    opacity: ${({ showonhover }) => (showonhover ? '1' : '0')};
    pointer-events: ${({ showonhover }) => (showonhover ? 'auto' : 'none')};
    visibility: ${({ showonhover }) => (showonhover ? 'visible' : 'hidden')};

    &:hover,
    &:focus {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }
  
 
 
`;



export default function DeleteButton({ showonhover, handleDeleteTweet, handleDeleteComment, commentId, tweetId }) {
  
  const handleDeleteClick = () => {
    if (commentId) {
      handleDeleteComment(commentId, tweetId);
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