import styled from "styled-components"
import Link from "next/link"

const StyledButton = styled.button`
   background-color: blue;
   border-radius: 1rem;
   border: none;
   width: 50px;
   height: 50px;
   `
export default function NewPostButton() {

    return (
        <Link href="/users/[userId]/new-post-form">
        <StyledButton> + </StyledButton>
        </Link>
    )



}
