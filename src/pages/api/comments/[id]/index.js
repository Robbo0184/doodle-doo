import dbConnect from "../../../../../db/connect";
import Tweet from "../../../../../db/models/Tweet";
import Comment from "../../../../../db/models/Comment";

export default async function handler(request, response) {
    await dbConnect();

    const { id: commentId } = request.query;

   
    if (request.method === "DELETE") {
        try {
            const tweetId = request.body.tweetId; 
            const commentToDelete = await Comment.findByIdAndDelete(commentId);

            if (!commentToDelete) {
                return response.status(404).json({ error: "Comment not found" });
            }

            await Tweet.findByIdAndUpdate(tweetId, {
                $pull: { comments: commentId },
            });

            return response.status(200).json(commentToDelete);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Internal Server Error" });
        }
    }

    if (request.method === "PATCH") {
        try {
            const userId = request.body.id; 
            const comment = await Comment.findById(commentId);

            if (!comment) {
                return response.status(404).json({ error: "Comment not found" });
            }

            let updatedComment;
            if (!comment.likes.includes(userId)) {
                updatedComment = await Comment.findByIdAndUpdate(
                    commentId,
                    { $push: { likes: userId } },
                    { new: true }
                );
            } else {
                updatedComment = await Comment.findByIdAndUpdate(
                    commentId,
                    { $pull: { likes: userId } },
                    { new: true }
                );
            }

            return response.status(200).json(updatedComment);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Internal Server Error" });
        }
    }

    response.setHeader("Allow", ["DELETE", "PATCH"]);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
}
