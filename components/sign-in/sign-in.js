import AuthButton from "../auth-button/AuthButton";
import styled from "styled-components";

const StyledDiv = styled.div`
   display: flex;
   margin-top: 40vh;

`







export default function SignIn() {
    return (
        <StyledDiv>
            <h1 className="sign--in--text">Please sign in.</h1>
            
            <AuthButton />
        </StyledDiv>
    )
}