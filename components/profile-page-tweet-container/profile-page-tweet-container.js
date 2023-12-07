import styled from "styled-components";
import DeleteButton from "../profile-page-delete-button/profile-page-delete-buton";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";


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

export default function ProfilePageTweetContainer({ tweets, handleDeleteTweet }) {
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const { id: userId } = router.query;
    const { data: user, mutate, error } = useSWR(userId ? `/api/users/${userId}` : null);
  
    return (
      <>
        {user.tweets.length > 0 ? (
          user.tweets.map((tweet) => {
            const formattedDate = new Date(tweet.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
  
            return (
              <div key={tweet._id}>
                <StyledLi
                  onMouseEnter={() => setShowDeleteButton(true)}
                  onMouseLeave={() => setShowDeleteButton(false)}
                >
                  {tweet.tweet}
                  {tweet.image && (
                    <Image
                      id="profilePageImage"
                      src={tweet.image}
                      style={{ borderRadius: '12%' }}
                      width={200}
                      height={150}
                      alt="tweet image"
                    />
                  )}
                  {' '} - {formattedDate}
                  {session?.user?.userId === userId && (
                    <DeleteButton
                      showonhover={showDeleteButton}
                      handleDeleteTweet={() => handleDeleteTweet(tweet._id)}
                      tweetId={tweet._id}
                    >
                      ❌
                    </DeleteButton>
                  )}
                </StyledLi>
              </div>
            );
          })
        ) : <p id="noDoodleDooMessageProfilePage">No doodle doos to display...</p>}
      </>
    );
  }