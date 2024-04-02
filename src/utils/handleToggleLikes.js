import { mutate } from 'swr';

export async function handleToggleLikes(tweetId, userId) {
    const response = await fetch(`/api/tweets/${tweetId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId}),
    });
    

    if (response.ok) {
        mutate("/api/users"); 
        mutate(`/api/tweets/${tweetId}`); 
    } else {
        console.error('Error toggling like: ', response.status, response.statusText);
        throw new Error('Like update failed');
    }
}