import { useRouter } from "next/router";
import Navbar from "../../../../components/navbar/navbar";
import useSWR from "swr";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import Image from "next/image";
import DoodleDoLogo from "../../../../public/assets/hen.png"
import BioModal from "../../../../components/bio-modal/bio-modal";
import { useState } from "react";
import Head from "next/head";


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

  .user--bio-container:hover & {
    opacity: 1;
  }

  ${StyledLi}:hover & {
    opacity: 1;
  }
  


  @media screen and (max-width: 500px) {
    opacity: 1;
    pointer-events: auto;
    transition: none;
    padding: 0.1rem 0.2rem;
    
  }
`;

const AddBioButton = styled.button`
border: none;
border-radius: 5px;
color: white;
font-size: rem;
background: linear-gradient(135deg, #4e54c8, #8f94fb);
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
transition: transform 0.3s ease, box-shadow 0.3s ease;

&:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}


`


export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  console.log("logging session", session);
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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="profile--page--main">
        <div className="profile-page-main-container">
          <div className="personal--content--div">
            <Image
              className="user--image"
              src={user.image}
              width={160}
              height={160}
              alt="profile-pic"
              style={{ borderRadius: '50%' }}
            />

            <h1 className="profile--page--header">
              {user.name}
            </h1>

            <Image
              className="doodle--doo--logo"
              src={DoodleDoLogo}
              width={160}
              alt="doodle-doo-logo"
            />

            <h3 className="user--email--heading">
              {user.email}
            </h3>
            {session?.user?.userId === userId &&
            <AddBioButton
              className="bio--button"
              onClick={() => setShowModal(true)}
            >
              {user?.bio?.length > 0 ? 'Edit Bio' : 'Add Bio'}
            </AddBioButton>
            }
            {user.bio && (
              <div className="user--bio-container">
                <p className="user--bio">
                  {user.bio}
                </p>
                <DeleteButton onClick={() => handleDeleteBio(user._id)}>❌</DeleteButton>
              </div>
            )}

            {showModal && (
              <BioModal onClose={() => setShowModal(false)}>
                Hello from the modal!

                {user?.bio?.length > 0 && (
                  <DeleteButton onClick={() => handleDeleteBio(user._id)}>❌</DeleteButton>
                )}
              </BioModal>
            )}
          </div>
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
                    {session?.user?.userId === userId &&
                    <DeleteButton onClick={() => handleDeleteTweet(tweet._id)}>❌</DeleteButton>
                    }
                  </StyledLi>
                </div>
              );
            })
          ) : (
            <p>No doodle doos to display</p>

          )}

        </div>
        <Navbar>
        </Navbar>
      </main >

    </>
  )

}
