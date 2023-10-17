import { useRouter } from "next/router";
import Navbar from "../../../../components/navbar/navbar";
import ProfilePageIcon from "../../../../components/profile-icon/profile-icon";
import useSWR from "swr";


export default function ProfilePage() {
    const router = useRouter();
    const { id } = router.query
    const { data: user, isLoading, error } = useSWR(id ? `/api/users/${id}` : null);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading user data: {error.message} </div>;
    }

    if (!user) return;

    console.log("user:", user);
 
    return (
        <>
            <h1>Hi from {user.name}s profile page.</h1>
            <Navbar>
            <ProfilePageIcon />
            </Navbar>
            
        </>
    )

}