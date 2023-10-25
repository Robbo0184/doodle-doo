import { useRouter } from "next/router";
import Navbar from "../../../../components/navbar/navbar";
import ImageUpload from "../../../../components/image-upload/image-upload";
import ProfilePageIcon from "../../../../components/profile-icon/profile-icon";
import useSWR from "swr";
import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import { mutate } from "swr";
import { useSession } from "next-auth/react";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column; 
    text-align: center;
    align-items: center;
`

const StyledLi = styled.li`
   border: 0.2rem solid white;
   box-shadow: 0 0 0 0.1rem blue;
   border-radius: 15%;
   padding: 0.5rem;
   margin: 1rem;
   max-width: 40vw;

`



export default function ProfilePage() {
 
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

  // async function handleDeleteTweet(tweetId) {
  //   const response = await fetch(`/api/tweets/${tweetId}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ id: userId }),
  //   });
  //   if (response.ok) {
     
  //     await response.json();
  //     mutate();
  //   } else {
  //     console.error(`Error: ${response.status}`)
  //   }
  // }

  async function handleDeleteTweet(tweetId) {
    const response = await fetch(`/api/tweets/${tweetId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });
    mutate()
    console.log("response:", response);
    
  }



  return (
    <>
      <Image src={user.image} width={160} height={160} alt="profile-pic"></Image>
      <StyledDiv>
        <h1>Hi from {user.name}s profile page.</h1>
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
                </StyledLi>
                <button type="button" onClick={() => handleDeleteTweet(tweet._id)}> ❌</button>
              </div>
            );
          })
        ) : (
          <p>No tweets to display</p>
        )}
        
        <Navbar>
          <ProfilePageIcon />
        </Navbar>
      </StyledDiv>
    </>
  )

}
