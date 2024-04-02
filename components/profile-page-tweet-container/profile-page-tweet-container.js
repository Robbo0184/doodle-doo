import styled from "styled-components";
import DeleteButton from "../profile-page-delete-button/profile-page-delete-buton";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { formatPostAge } from "@/utils/createCommentTweetAge";


const StyledLi = styled.li`
border: 2px solid #CCCCCC;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
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

  &:hover .delete-button {
    opacity: 1;
  }
  
  .delete-button {
    opacity: 0;
    transition: opacity 0.5s ease;
    position: absolute;
    top: -0.5rem;
    right: -2.2rem;
    background-color: #CCCCCC; 
    color: #333;
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
    cursor: pointer;
  }

  @media screen and (max-width: 500px){
    padding: 1rem;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 1rem;
    max-width: 65vw;
  }
`;

export default function ProfilePageTweetContainer({ tweets, handleDeleteTweet }) {
    
    const { data: session } = useSession();
    const router = useRouter();
    const { id: userId } = router.query;
    const { data: user, mutate, error } = useSWR(userId ? `/api/users/${userId}` : null);
    
    let sortedTweets = [];

    if (user) {
      sortedTweets = user.tweets.sort((a,b) => new Date(b.date) - new Date(a.date))
    }
    return (
      <>
        
      {sortedTweets.length > 0 ? (
        sortedTweets.map((tweet) => {
          const formattedDate = new Date(tweet.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
  
            return (
              <div key={tweet._id}>
                <StyledLi
                  
                >
                  {tweet.tweet}
                  {tweet.image && (
                    <Image
                      id="profilePageImage"
                      src={tweet.image}
                      style={{ borderRadius: '15px' }}
                      width={400}
                      height={250}
                      alt="tweet image"
                    />
                  )}
                  {' '} - {formatPostAge(tweet.date)}
                  {session?.user?.userId === userId && (
                    <DeleteButton
                      
                      className="delete-button"
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