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
    margin-bottom: 100px;
    
`


const ImagesDiv = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 15rem;
    text-align: center;
    align-items: center;
`
const EmailDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 95vw;
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

  ${StyledLi}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: #c1c1c1; /* Slightly darker hover background color for more contrast */
  }
`;




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
      <StyledDiv>
        <ImagesDiv>
          <Image className="user--image" src={user.image} width={160} height={160} alt="profile-pic" style={{ borderRadius: '50%' }}></Image>
          <h1 className="profile--page--header">Hi from {user.name}{user.name.slice(-1).toLowerCase() === 's' ? "'" : "'s"} profile page.</h1>
          <Image src={DoodleDoLogo} width={160} alt="doodle-doo-logo" />
        </ImagesDiv>
        <EmailDiv>
          <h3 className="user--email--heading">{user.email}</h3>
        </EmailDiv>
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
        <ProfilePageIcon />
      </Navbar>


    </>
  )

}
