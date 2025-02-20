import { mutate } from "swr";

export async function handleDeleteComment(commentId, tweetId, userId, parentCommentId) {
  console.log('handleDeleteComment called with:', {
    commentId,
    tweetId,
    userId,
    parentCommentId
  });
  try {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tweetId,
        parentCommentId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }

    // These are the same mutate calls from your original working version
    mutate("/api/users");
    mutate(`/api/tweets/${tweetId}`);

    if (userId) {
      await mutate(`/api/users/${userId}`);
    }

  } catch (error) {
    console.error('Error deleting comment:', error);
  }
}