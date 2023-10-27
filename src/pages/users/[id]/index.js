import { useRouter } from "next/router";
import Navbar from "../../../../components/navbar/navbar";
import ProfilePageIcon from "../../../../components/profile-icon/profile-icon";
import useSWR from "swr";
import styled from "styled-components";
import Image from "next/image";
import DoodleDoLogo from "../../../../public/assets/hen.png"


const StyledDiv = styled.div`
    display: flex;
    flex-direction: column; 
    text-align: center;
    align-items: center;
    
`

const ImagesDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledLi = styled.li`
   border: 2px solid #CCCCCC;
   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
   border-radius: 15%;
   padding: 0.5rem;
   margin: 1rem;
   max-width: 40vw;
   list-style-type: none;

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
      <ImagesDiv>
      <Image className="user--image" src={user.image} width={160} height={160} alt="profile-pic" style={{ borderRadius: '50%' }}></Image>
      <h1 className="profile--page--header">Hi from {user.name}{user.name.slice(-1).toLowerCase() === 's' ? "'" : "'s"} profile page.</h1>
      <Image src={DoodleDoLogo} width={160} alt="doodle-doo-logo" />
      </ImagesDiv>
      <h3>{user.email}</h3>
      <StyledDiv>


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
          <p>No doodle doos to display</p>
        )}
        
        <Navbar>
          <ProfilePageIcon />
        </Navbar>
      </StyledDiv>
    </>
  )

}
