import { useRouter } from "next/router";
import Navbar from "../../../../components/navbar/navbar";
import ProfilePageIcon from "../../../../components/profile-icon/profile-icon";
import useSWR from "swr";
import styled from "styled-components";

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
    const { id } = router.query
    const { data: user, isLoading, mutate, error } = useSWR(id ? `/api/users/${id}` : null);
    console.log(user);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading user data: {error.message} </div>;
    }

    if (!user) return;

    async function handleDeleteTweet(_id) {
        const response = await fetch(`/api/users/${id}/tweets`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: _id }),
          });
          if (response.ok) {
            await response.json();
            mutate();
          } else {
            console.error(`Error: ${response.status}`)
          }
    }



    return (
        <>
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