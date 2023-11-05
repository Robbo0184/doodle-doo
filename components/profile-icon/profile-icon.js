import profilePageIcon from "../../public/assets/profile.png"
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";


export default function ProfilePageIcon() {
    const { data: session } = useSession();
    const id = session && session.user ? session.user.userId : null;
    
    return (
        <Link href={`/users/${id}`}>
            <Image className="profile--pic--icon" src={profilePageIcon} width={78} alt="Profile-page-icon" />
        </Link>
    )
}