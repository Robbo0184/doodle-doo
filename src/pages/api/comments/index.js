import dbConnect from "../../../../db/connect";
import Tweet from "../../../../db/models/Tweet";
import Comment from "../../../../db/models/Comment";

export default async function handler(request, response) {
  await dbConnect()

  if (request.method === "POST") {
    try {

      const { comment, tweetId, userName, userId } = request.body
      
      const newComment = await Comment.create({ comment, userName, commentUserId: userId  });
      await Tweet.findByIdAndUpdate(
        tweetId,
        { $push: { comments: newComment._id } },
        { new: true }
      );
      response.status(200).json({ success: "comment successfully created" })
    } catch (error) {
      console.log(error);
    }
  }

  if (request.method === "DELETE") {
    try {
      const { id: tweetId } = request.body
      const commentToDelete = await Comment.findByIdAndDelete(commentId);
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { tweets: tweetId },
      });


      return response
        .status(200)
        .json(tweetToDelete);
    } catch (e) {
      console.log(e);
    }
  }

}
