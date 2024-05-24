import dbConnect from "../../../../../db/connect";
import User from "../../../../../db/models/User";
import Tweet from "../../../../../db/models/Tweet";
import { Types } from 'mongoose';


export default async function handler(request, response) {
  await dbConnect()
  const { id: userId } = request.query;

 

  if (!userId || !Types.ObjectId.isValid(userId)) {
    console.error("Invalid user ID:", userId);
    return response.status(400).json({ error: "Invalid user ID" });
}

  if (request.method === "GET") {
    const user = await User.findById(userId).populate({
      path: 'tweets', 
      populate: {
        path: 'comments',
        model: 'Comment', 
        populate: {
          path: 'commentUserId', 
          model: 'User' 
        }
      }
    }).populate({
      path: "followers",
      model: "User",
      select: "name image",
    }).populate({
      path: "following",
      model: "User",
      select: "name image",
    })

    if (!user) {
      return response.status(404).json({ status: "Not found" })
    }
    response.status(200).json(user)

  }

  if (request.method === "POST") {
    try {
      const newTweet = await Tweet.create(request.body);
      await User.findByIdAndUpdate(
        userId,
        { $push: { tweets: newTweet._id } },
        { new: true }
      );
      response.status(200).json({ success: "tweet successfully created" })
    } catch (error) {
      console.log(error);
    }
  }
}