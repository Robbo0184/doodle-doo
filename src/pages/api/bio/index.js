import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";



export default async function handler(request, response) {
    await dbConnect()

    if (request.method === "POST") {
        try {
            const { bio, userName, userId } = request.body;
      
            const updatedUser = await User.findOneAndUpdate(
              { _id: userId },
              { bio },
              { new: true }
            );
      
            if (!updatedUser) {
              return response.status(404).json({ error: "User not found" });
            }
      
            return response.status(200).json(updatedUser);
          } catch (error) {
            console.log(error);
            return response.status(500).json({ error: "Internal Server Error" });
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
