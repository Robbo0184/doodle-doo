//  export async function handleToggleLikes(tweetId, userId) {
//     const response = await fetch(`/api/tweets/${tweetId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userId),
//     });
//     if (response.ok) {
//       await response.json();
//       mutate();
//     }
//   }

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
        mutate("/api/users"); // Broad refetch, likely remains necessary

        // Target Specific Tweet and its Nested Data
        mutate(`/api/users/${userId}/tweets/${tweetId}`);

        // Inspect the Response Here
        const updatedTweetData = await response.json();
        console.log("Updated Tweet from Backend:", updatedTweetData);
    } else {
        console.error('Error toggling like: ', response.status, response.statusText);
        throw new Error('Like update failed');
    }
}