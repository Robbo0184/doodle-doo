import dbConnect from "../../../../../db/connect";
import Tweet from "../../../../../db/models/Tweet";
import Comment from "../../../../../db/models/Comment";



export default async function handler(request, response) {
    await dbConnect()
    const { id: commentId } = request.query;
    const {id: tweetId} = request.body
    console.log("Logging tweetID :", tweetId, commentId);
    
    if (request.method === "DELETE") {
        try {
          
            const commentToDelete = await Comment.findByIdAndDelete(commentId);
            await Tweet.findByIdAndUpdate(tweetId, {
                $pull: { comments: commentId },
            });
            console.log("commentToDelete", commentToDelete);
            
          return response
            .status(200)
            .json(commentToDelete);
        } catch (e) {
          console.log(e);
        }
      }

}














