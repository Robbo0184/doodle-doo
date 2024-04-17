import dbConnect from "../../../../../db/connect";
import User from "../../../../../db/models/User";
import Tweet from "../../../../../db/models/Tweet";



export default async function handler(request, response) {
  await dbConnect()
  const { id: userId } = request.query;


  if (!userId) {
    return;
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
    });

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