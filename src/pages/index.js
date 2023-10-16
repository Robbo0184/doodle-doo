import Navbar from "../../components/navbar/navbar"
import useSWR from "swr";

export default function Home() {
  
  const { data: users, isLoading } = useSWR("/api/users")
  console.log(users);
  if (isLoading) {
    return
  }
  
  return (

    <>
    <h1>Hiya! xx</h1>
    <Navbar>
    
    </Navbar>
    </>


  )
}
