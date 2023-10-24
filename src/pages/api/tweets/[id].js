import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import Tweet from "../../../../db/models/Tweet";




export default async function handler(request, response) {
  await dbConnect();

  const { id: tweetId } = request.query;
  const userId = request.body 

  

  if (!tweetId) {
    return;
  }
 

  if (request.method === "PATCH") {
    try {
      console.log("Logging userId:", request.body); 

      const tweet = await Tweet.findById(tweetId);

      if (!tweet.likes.includes(request.body)) {
       
        const updatedTweet = await Tweet.findByIdAndUpdate(
          tweetId,
          { $push: { likes: request.body } }, 
          { new: true }
        );
        
        return response.status(200).json(updatedTweet);
      } else {
      
        const updatedTweet = await Tweet.findByIdAndUpdate(
          tweetId,
          { $pull: { likes: request.body } }, 
          { new: true }
        );
        
        return response.status(200).json(updatedTweet);
      }
      
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
} else {
    response.status(405).json({ error: "Method Not Allowed" });
}



  


  if (request.method === "DELETE") {
    try {
      const { id: userId } = request.body
      
      const tweetToDelete = await Tweet.findByIdAndDelete(tweetId);
      await User.findByIdAndUpdate(userId, {
        $pull: { tweets: tweetId },
      });

      return response
        .status(200)
        .json({ success: "tweet successfully deleted" });
    } catch (e) {
      console.log(e);
    }
  }

}
