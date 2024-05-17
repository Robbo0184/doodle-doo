import { mutate } from "swr";

export async function handleToggleFollower(setIsFollower, sessionId, userId, isFollower) {
  

  if (!sessionId || !userId) {
    console.error("Missing sessionId or userId");
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
    setIsFollower(!isFollower);
    

  
    mutate(`/api/users/${userId}`);
    
  } else {
    const errorData = await response.json();
    console.error("Error toggling follower:", errorData.error);
  }
}
