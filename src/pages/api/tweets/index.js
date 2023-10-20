import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import Tweet from "../../../../db/models/Tweet";


export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  if (!id) {
    return;
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