import styled from "styled-components"

const StyledButton = styled.button`
  background-color: #CCCCCC; 
  color: #333;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: -20px;
  transition: opacity 0.5s ease, height 0.5s ease;  
   
  
     @media screen and (max-width: 500px){
      right: 10px;
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

      {showonhover && (
        <StyledButton type="button" onClick={handleDeleteClick}>
          ❌
        </StyledButton>
      )}
    </>
  )
}
