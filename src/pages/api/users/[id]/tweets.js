import dbConnect from "../../../../../db/connect";
import User from "../../../../../db/models/User";
import Tweet from "../../../../../db/models/Tweet";


export default async function handler(request, response) {
    await dbConnect();

    const { id } = request.query;
    if (!id) {
        return;
    }

    if (request.method === "POST") {
        try {
            console.log("request body", request.body);
            const newTweet = await Tweet.create(request.body);
            await User.findByIdAndUpdate(
                id,
                { $push: { tweets: newTweet._id } },
                { new: true }
            );
            response.status(200).json({success: "tweet successfully created"})
        } catch (error) {
            console.log(error);
        }
    }

    if (request.method === "DELETE") {
        try {
          
          const tweetToDelete = await Tweet.findByIdAndDelete(request.body.id);
          await User.findByIdAndUpdate(id, {
            $pull: { tweets: tweetToDelete._id },
          });
          
          return response
            .status(200)
            .json({ success: "tweet successfully deleted" });
        } catch (e) {
          console.log(e);
        }
      }

}