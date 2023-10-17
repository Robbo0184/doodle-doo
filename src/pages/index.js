import Navbar from "../../components/navbar/navbar"
import useSWR from "swr";
import { useSession } from "next-auth/react";
import SignIn from "../../components/sign-in/sign-in";
import AuthButton from "../../components/auth-button/AuthButton";

export default function Home() {
  
  const { data: users, isLoading } = useSWR("/api/users")
  const { data: session } = useSession();
  
  if (isLoading) {
    return
  }
  
  return (
    <>
      {session ? (
        <>
          <h1>Hiya! xx</h1>
          <Navbar />
          <AuthButton />
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
}
