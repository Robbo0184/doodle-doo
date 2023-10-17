import { signOut, signIn, useSession } from "next-auth/react";
import styled from "styled-components"

const StyledButton = styled.button`
   background-color: green;
   border-radius: 1rem;
   border: none;
   width: 100px;
   padding: 1rem;
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