import styled from "styled-components"
import Link from "next/link"
import { useSession } from "next-auth/react";


const StyledButton = styled.button`
   background-color: blue;
   border-radius: 1rem;
   border: none;
   width: 50px;
   height: 50px;
   `
export default function NewPostButton() {
    const { data: session } = useSession();
    const id = session && session.user ? session.user.userId : null;

    return (
        <Link href={`/users/${id}/new-post-form`}>
        <StyledButton> + </StyledButton>
        </Link>
    )



}
