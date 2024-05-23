import styled from "styled-components";
import DeleteButton from "../profile-page-delete-button/profile-page-delete-buton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const StyledDiv = styled.div`
grid-area: bio;
position: relative;
max-width: 30vw; 
display: block;
margin-left: -6rem;
margin-top: 2rem;
padding-bottom: 3rem;
white-space: normal;
word-wrap: break-word; 
overflow-wrap: break-word; 


&:hover .delete-button {
    opacity: 1;
  }

  .delete-button {
    opacity: 0;
    transition: opacity 0.5s ease;
    position: absolute;
    top: 0;
    right: -3rem;
    background-color: #CCCCCC; 
    color: #333;
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
    cursor: pointer;
  }

  @media screen and (max-width: 500px) {
    margin-left: -1.5rem;
    margin-right: 0;
    margin-top: 1.7rem;
    
    justify-content: center;
    font-size: 0.9rem;
    min-width: 15vw;
    max-width: 30vw;
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