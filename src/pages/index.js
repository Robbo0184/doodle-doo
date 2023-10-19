import Navbar from "../../components/navbar/navbar";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import SignIn from "../../components/sign-in/sign-in";
import AuthButton from "../../components/auth-button/AuthButton";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  min-height: 50vh;
  line-height: 2rem;
  padding-top: 0.5rem;
  gap: 1rem;
`;

const StyledLi = styled.li`
   border: 0.2rem solid white;
   box-shadow: 0 0 0 0.1rem blue;
   border-radius: 15%;
   padding: 0.5rem;
   margin: 1rem;

`



export default function Home() {
  const { data: users, isLoading, isError } = useSWR("/api/users");
  const { data: session } = useSession();
  const userName = session?.user?.name;

  console.log(users);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (isError || users === undefined) { 
    return <div>Error loading users data</div>; 
  }

  return (
    <>
      <StyledDiv>
        {session ? (
          <>
            <h1>Hiya {userName} xx</h1>
            <ul>
              {users.map((user) => {
                if (user.tweets && user.tweets.length > 0) {
                  return user.tweets.map((tweet) => (
                    <StyledLi key={tweet._id}>
                      {tweet.tweet} {tweet.userName}
                    </StyledLi>
                  ));
                } else {
                
                  return <StyledLi key={user._id}>No tweets</StyledLi>;
                }
              })}
            </ul>
            <Navbar />
            <AuthButton />
          </>
        ) : (
          <SignIn />
        )}
      </StyledDiv>
    </>
  );
}
