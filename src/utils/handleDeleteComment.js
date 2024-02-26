import { mutate } from "swr";

export async function handleDeleteComment(commentId, tweetId) {
    
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tweetId }),
      
    });
    mutate("/api/users")
  }
