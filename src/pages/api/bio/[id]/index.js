import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";



export default async function handler(request, response) {
    await dbConnect()
    
    if (request.method === "POST") {
        try {
            const { bio, userName } = request.body;
            console.log("bio + userName", bio);
           
            
            
            // const newComment = await Comment.create({ comment, userName });
            // await Tweet.findByIdAndUpdate(
                //     tweetId,
                //     { $push: { comments: newComment._id } },
                //     { new: true }
                // );
                // response.status(200).json({ success: "comment successfully created" })
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
            console.log("tweetToDelete", tweetToDelete);

            return response
                .status(200)
                .json(tweetToDelete);
        } catch (e) {
            console.log(e);
        }
    }

}
