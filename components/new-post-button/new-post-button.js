import styled from "styled-components"
import Link from "next/link"
import { useSession } from "next-auth/react";
import NewPostIcon from "../../public/assets/new-post.png"
import Image from "next/image";

const StyledButton = styled.button`
   
   width: 50px;
   height: 50px;
   `
export default function NewPostButton() {
    const { data: session } = useSession();
    const id = session && session.user ? session.user.userId : null;

    return (
        <Link href={`/users/${id}/new-post-form`}>
            <Image className="new--post--icon" src={NewPostIcon} width={70} alt="new post icon" />
        </Link>
    )



}
