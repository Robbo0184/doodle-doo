import { useRouter } from "next/router";
import Navbar from "../../../../components/navbar/navbar";
import useSWR from "swr";
import styled from "styled-components";
import Image from "next/image";
import DoodleDoLogo from "../../../../public/assets/hen.png"
import BioModal from "../../../../components/bio-modal/bio-modal";
import { useState } from "react";


const StyledDiv = styled.div`
display: flex;
flex-direction: column; 
text-align: center;
align-items: center;
margin-bottom: 100px;
`
const ImagesDiv = styled.div`
display: flex;
justify-content: space-between;
gap: 15rem;
text-align: center;
align-items: center;

@media screen and (max-width: 500px) {
  flex-direction: row; 
  justify-content: space-evenly; 
  padding: 1rem; 
  margin-top: -0.8rem;
  position: relative;
  width: 100%; 
  align-items: flex-start;
  

  .user--image {
    border-radius: 50%;
    margin: 0; 
    position: absolute;
    width: 50px;
    height: 50px;
    top: 1rem; 
    left: 0.8rem; 
  }
  
  .doodle--doo--logo {
    margin: 0; 
    position: absolute;
    width: 50px;
    height: 50px;
    top: 1rem; 
    right: 0.1rem; 
  }
}
`

const EmailDivContainer = styled.div`
position: relative;
width: 100vw;
margin-bottom: 2rem;
height: 3vh;
`

const EmailDiv = styled.div`
display: flex;
position: relative;
width: 100%vw;
text-align: center;

left: 1.5rem;

gap: 0.5rem;
@media screen and (max-width: 500px){
  
  left: 0rem;
  top: -0.8rem;
  
}
`
const StyledLi = styled.li`
border: 2px solid #CCCCCC;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15%;
  padding: 2rem;
  font-family: 'Playpen Sans', sans-serif;
  margin: 1rem;
  max-width: 40vw;
  list-style-type: none;
  position: relative; 
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f0f0f0; 
  };

  @media screen and (max-width: 500px){
    padding: 0.7rem;
    font-size: 0.8rem;
  }
`;

const BioDiv = styled.div`
position: relative;
@media screen and (max-width: 500px){
  
 font-size: 0.8rem;
 margin-right: 240px;
 margin-top: -2rem;
 min-width: 35vw;
 padding: 0 2rem;
 
  
}

`
const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ddd; 
  color: #555; 
  border: none;
  border-radius: 50%;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${StyledLi}:hover & {
    opacity: 1;
  }
  
 ${BioDiv}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: 
  }

  @media screen and (max-width: 500px) {
    opacity: 1;
    pointer-events: auto;
    transition: none;
    padding: 0.1rem 0.2rem;
    
  }
`;

const AddBioButton = styled.button`
      position: absolute;
      right: 15.3rem;
      top: 1.5rem;
      
      @media screen and (max-width: 500px){
        position: absolute;
        top: 0.9rem;
        right: 0rem;
      }
`





export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { id: userId } = router.query
  const { data: user, isLoading, mutate, error } = useSWR(userId ? `/api/users/${userId}` : null);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data: {error.message} </div>;
  }

  if (!user) return;



  async function handleDeleteTweet(tweetId) {
    const response = await fetch(`/api/tweets/${tweetId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });
    mutate()
  }

  async function handleDeleteBio(userId) {
    const response = await fetch('/api/bio', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId })
    });
    mutate()
  }


  return (
    <>
      <main className="profile--page--main">
        <StyledDiv>
          <ImagesDiv className="profile--page--images--div">
            <Image className="user--image" src={user.image} width={160} height={160} alt="profile-pic" style={{ borderRadius: '50%' }}></Image>
            <h1 className="profile--page--header"> {user.name}</h1>
            <Image className="doodle--doo--logo" src={DoodleDoLogo} width={160} alt="doodle-doo-logo" />
          </ImagesDiv>
          <EmailDivContainer>
            <EmailDiv className="email--div">
              <h3 className="user--email--heading">{user.email}</h3>
              <AddBioButton onClick={() => {
                setShowModal(true);
              }}>{user?.bio?.length > 0 ? 'Edit Bio' : 'Add Bio'}</AddBioButton>
              {showModal &&
                <BioModal onClose={() => setShowModal(false)}>
                  Hello from the modal!
                </BioModal>
              }
            </EmailDiv>
          </EmailDivContainer>
          <BioDiv>
            <p className="user--bio">{user.bio}</p>
            {user?.bio?.length > 0 && <DeleteButton onClick={() => handleDeleteBio(user._id)}>❌</DeleteButton>}
          </BioDiv>

          {user.tweets.length > 0 ? (
            user.tweets.map((tweet) => {
              const formattedDate = new Date(tweet.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              });

              return (
                <div key={tweet._id}>
                  <StyledLi>
                    {tweet.tweet} - {formattedDate}
                    <DeleteButton onClick={() => handleDeleteTweet(tweet._id)}>❌</DeleteButton>
                  </StyledLi>
                </div>
              );
            })
          ) : (
            <p>No doodle doos to display</p>

          )}

        </StyledDiv>
        <Navbar>
        </Navbar>
      </main >

    </>
  )

}
