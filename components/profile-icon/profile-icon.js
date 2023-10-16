import styled from "styled-components";
import profilePageIcon from "../../public/assets/profile-page.svg"
import Link from "next/link";
import Image from "next/image";


export default function ProfilePageIcon ({id}) {
    return (
         <Link href={`/users/${id}`}>
         <Image src={profilePageIcon} alt="Profile-page-icon"/>
         </Link>
    )
}