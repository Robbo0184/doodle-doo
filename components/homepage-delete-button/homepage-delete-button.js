import styled from "styled-components"
import { useRouter } from "next/router";

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

export default function DeleteButton({ className, handleDeleteTweet, handleDeleteComment, commentId, tweetId, shouldRedirect = false  }) {
  const router = useRouter()
  const handleDeleteClick = () => {
    if (commentId) {
      handleDeleteComment(commentId, tweetId);

    } else {
      handleDeleteTweet(tweetId);
      if (shouldRedirect) {
        router.push('/'); 
      }
    }
  }

  return (
    <>


      <StyledButton
        type="button"
        className={className}
        onClick={handleDeleteClick}>
        ❌
      </StyledButton>

    </>
  )
}
