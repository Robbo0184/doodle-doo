import { mutate } from "swr";

export async function handleDeleteBio(userId) {
    const response = await fetch('/api/bio', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId })
    });
    mutate(`/api/users/${userId}`)
  }