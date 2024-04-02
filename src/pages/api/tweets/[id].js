import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import Tweet from "../../../../db/models/Tweet";
import { Types } from 'mongoose';

export default async function handler(request, response) {
  await dbConnect();

  const { id: tweetId } = request.query;

  if(!Types.ObjectId.isValid(tweetId)) {
    return response.status(404).json({ error: 'Invalid tweet ID' })
  }


  if (!tweetId) {
    return;
  }

  if (request.method === "GET") {
    try {
      const tweet = await Tweet.findById(tweetId).populate('comments');
      return response.status(200).json(tweet);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (request.method === "PATCH") {
    try {
      const userId = request.body.id;
      const tweet = await Tweet.findById(tweetId);

      if (!tweet.likes.includes(userId)) {
        const updatedTweet = await Tweet.findByIdAndUpdate(
          tweetId,
          { $push: { likes: userId } },
          { new: true }
        );
        return response.status(200).json(updatedTweet);
      } else {
        const updatedTweet = await Tweet.findByIdAndUpdate(
          tweetId,
          { $pull: { likes: userId } },
          { new: true }
        );
        return response.status(200).json(updatedTweet);
      }
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }


  if (request.method === "DELETE") {
    try {
      const { id: userId } = request.body;
      const tweetToDelete = await Tweet.findByIdAndDelete(tweetId);
      await User.findByIdAndUpdate(userId, {
        $pull: { tweets: tweetId },
      });


      return response.status(200).json(tweetToDelete);
    } catch (e) {
      console.log(e);
    }
  }
}
