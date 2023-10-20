import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import Tweet from "../../../../db/models/Tweet";


export default async function handler(request, response) {
  await dbConnect();
 
  const { id: tweetId } = request.query;
  
 
  if (!tweetId) {
    return;
  }




if (request.method === "PATCH") {
    try {
      console.log("userId:", request.body);
      await Tweet.findByIdAndUpdate(
        tweetId,
        { $push: { likes: request.body } },
        { new: true }
      )
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Internal Server Error" });
    }

}

}