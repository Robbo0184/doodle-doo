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
import AddBioButton from "../../../../components/add-bio-button/add-bio-button";
import DeleteButton from "../../../../components/profile-page-delete-button/profile-page-delete-buton";
import UserBioContainer from "../../../../components/user-bio-container/user-bio-container";

const StyledLi = styled.li`
border: 2px solid #CCCCCC;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15%;
  padding: 1rem;
  font-family: 'Playpen Sans', sans-serif;
  margin: 1rem;
  max-width: 40vw;
  list-style-type: none;
  position: relative; 
  transition: background-color 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    background-color: #f0f0f0; 
  };

  @media screen and (max-width: 500px){
    padding: 1rem;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 1rem;
    max-width: 50vw;
  }
`;




export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const { data: session } = useSession();
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
                onClick={() => {
                  setShowModal(true);
                }}
              />
              }
            {user.bio && (
              <UserBioContainer user={user} handleDeleteBio={handleDeleteBio}/>

            )}
            {showModal && (
              <BioModal onClose={() => setShowModal(false)}>
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
                  <StyledLi
                    onMouseEnter={() => setShowDeleteButton(true)}
                    onMouseLeave={() => setShowDeleteButton(false)}>
                    {tweet.tweet}
                    {tweet.image && <Image id="profilePageImage" src={tweet.image} style={{ borderRadius: '12%' }} width={200} height={150} alt="tweet image" />}
                    {" "}- {formattedDate}
                    {session?.user?.userId === userId &&
                      <DeleteButton showonhover={showDeleteButton} handleDeleteTweet={() => handleDeleteTweet(tweet._id)} tweetId={tweet._id}>❌</DeleteButton>
                    }
                  </StyledLi>
                </div>
              );
            })
          ) : (
            <p id="noDoodleDooMessageProfilePage">No doodle doos to display...</p>

          )}

        </div>
        <Navbar>
        </Navbar>
      </main >

    </>
  )

}
