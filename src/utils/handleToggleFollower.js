import { mutate } from "swr";

export async function handleToggleFollower(sessionId, userId) {
  if (!sessionId || !userId) {
    console.error("Missing followerId or userId");
    return; 
  }

  const response = await fetch(`/api/followers/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId }),
  });

  if (response.ok) {
    mutate('/api/users');
    mutate(`/api/users/${userId}`); 
  } else {
    
    const errorData = await response.json();
    console.error("Error toggling follower:", errorData.error);
  }
}