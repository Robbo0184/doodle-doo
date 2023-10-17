import profilePageIcon from "../../public/assets/profile-page.svg"
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";


export default function ProfilePageIcon() {
    const { data: session } = useSession();
    const id = session && session.user ? session.user.userId : null;
    
    return (
        <Link href={`/users/${id}`}>
            <Image src={profilePageIcon} alt="Profile-page-icon" />
        </Link>
    )
}