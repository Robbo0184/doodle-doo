import { mutate } from "swr";


export async function handleDeleteTweet(tweetId, userId) {
    
    const response = await fetch(`/api/tweets/${tweetId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });
    await mutate("/api/users")
    

   await mutate(`/api/users/${userId}`);
  }