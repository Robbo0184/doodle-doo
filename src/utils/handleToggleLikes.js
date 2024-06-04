import { mutate } from 'swr';

export async function handleToggleLikes(tweetId, userId, commentId) {
    try {
        let response;

        if (tweetId) {

            response = await fetch(`/api/tweets/${tweetId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: userId }),
            });

            if (response.ok) {
                await mutate("/api/users");
                await mutate(`/api/tweets/${tweetId}`);
                await mutate(`/api/users/${userId}`);
            } else {
                console.error('Error toggling like: ', response.status, response.statusText);
                throw new Error('Like update failed');
            }
        } else if (commentId) {

            response = await fetch(`/api/comments/${commentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: userId }),
            });


            if (response.ok) {
                await mutate("/api/users");
                await mutate(`/api/users/${userId}`);
                await mutate(`/api/comments/${commentId}`); 
                
            } else {
                console.error('Error toggling like: ', response.status, response.statusText);
                throw new Error('Like update failed');
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
