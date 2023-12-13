import { signOut, signIn, useSession } from "next-auth/react";
import styled from "styled-components"

const StyledButton = styled.button`
   background-color: #d8d8ff;
   border-radius: 1rem;
   border: none;
   width: 100px;
   padding: 1rem;
   position: fixed;
   color: #333;
   top: 10px;
   right: 10px;
   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); 
   transition: background-color 0.3s ease, color 0.3s ease; 
   &:hover {
      background-color: #b0b0e6; 
      color: #fff; 
   }

   @media screen and (max-width: 500px) {
    width: 50px;
    height: 50px
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
`
export default function AuthButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <StyledButton onClick={() => signOut()}>
                    Sign out
                </StyledButton>
            </>
        );
    }
    return (
        <>
            <StyledButton onClick={() => signIn()}>
                Sign in
            </StyledButton>

        </>
    )
}