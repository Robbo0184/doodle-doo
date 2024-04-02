import styled from "styled-components";
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

&:hover .delete-button {
    opacity: 1;
  }

  .delete-button {
    opacity: 0;
    transition: opacity 0.5s ease;
    position: absolute;
    top: 0;
    right: 0;
    background-color: #CCCCCC; 
    color: #333;
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
    cursor: pointer;
  }

@media screen and (max-width: 500px){
    margin-left: -10%;
    margin-right: 20%;
    margin-top: -1%;
    display: flex;
}
`

export default function UserBioContainer({ user, handleDeleteBio }) {

    const { data: session } = useSession();
    const router = useRouter();
    const { id: userId } = router.query

    return (
        <>
            <StyledDiv>
                <p className="user--bio">
                    {user.bio}
                </p>
                {session?.user?.userId === userId &&
                    <DeleteButton
                        className="delete-button"
                        handleDeleteBio={() => handleDeleteBio(user._id)}
                        userId={user._id} >❌</DeleteButton>
                }
            </StyledDiv>
        </>
    )
}