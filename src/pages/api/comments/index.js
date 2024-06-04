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

}
