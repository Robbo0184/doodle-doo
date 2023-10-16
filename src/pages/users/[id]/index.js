import { useRouter } from "next/router";
import Navbar from "../../../../components/navbar/navbar";
import ProfilePageIcon from "../../../../components/profile-icon/profile-icon";


export default function ProfilePage() {
    const router = useRouter();
    const { id } = router.query




    return (
        <>
            <h1>Hi from user {id}s profile page.</h1>
            <Navbar>
            <ProfilePageIcon id={id} />
            </Navbar>
            
        </>
    )

}