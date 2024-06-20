import { mutate } from 'swr';

export async function handleToggleLikes(tweetId, userId, commentId = null) {
    try {
        const isComment = commentId !== null;
        const url = isComment ? `/api/comments/${commentId}` : `/api/tweets/${tweetId}`;

        const response = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: userId })
        });

        if (!response.ok) {
            throw new Error('Like update failed');
        }

        await mutate(`/api/tweets/${tweetId}`);
        await mutate(`/api/users/${userId}`);
        await mutate("/api/users");

    } catch (error) {
        console.error('An error occurred:', error);
    }
}




