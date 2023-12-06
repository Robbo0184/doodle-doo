import styled from "styled-components";
import { useState } from "react";
import DeleteButton from "../profile-page-delete-button/profile-page-delete-buton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const StyledDiv = styled.div`
display: inline-block;
grid-area: bio;
position: relative;
margin-top: 15%;
margin-left: -60%;
padding-right: 30%;
`

export default function UserBioContainer({user, handleDeleteBio}) {
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const { id: userId } = router.query

    return (
        <>
            <StyledDiv
                onMouseEnter={() => setShowDeleteButton(true)}
                onMouseLeave={() => setShowDeleteButton(false)}
            >
                <p className="user--bio">
                    {user.bio}
                </p>
                {session?.user?.userId === userId &&
                    <DeleteButton
                        showonhover={showDeleteButton}
                        handleDeleteBio={() => handleDeleteBio(user._id)}
                        userId={user._id} >❌</DeleteButton>
                }
            </StyledDiv>
        </>
    )
}