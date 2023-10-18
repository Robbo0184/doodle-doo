import { useRouter } from "next/router";
import Navbar from "../../../../components/navbar/navbar";
import ProfilePageIcon from "../../../../components/profile-icon/profile-icon";
import useSWR from "swr";


export default function ProfilePage() {
    const router = useRouter();
    const { id } = router.query
    const { data: user, isLoading, mutate, error } = useSWR(id ? `/api/users/${id}` : null);

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
                <li>
                  {tweet.tweet} - {formattedDate}
                </li>
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
      </>
    )

}