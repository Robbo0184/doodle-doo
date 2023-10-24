import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import Tweet from "../../../../db/models/Tweet";
import Comment from "../../../../db/models/Comment";

export default async function handler(request, response) {
    await dbConnect()


    // if (request.method === "GET") {
    //     const user = await findById(userId).populate("comments");
        
    //     if (!user) {
    //         return response.status(404).json({ status: "Not found"})
    //     }
    //     response.status(200).json(user)
       
    // }
    

   if(request.method === "POST") {
        try {
        const {tweetId, comment, userName} = request.body
        console.log("Tweet id:", tweetId);
        
        const newComment = await Comment.create({comment, userName});
        await Tweet.findByIdAndUpdate(
            tweetId,
            { $push: {comments: newComment._id}},
            {new: true}
        );
        response.status(200).json({success: "comment successfully created"})
        } catch(error) {
          console.log(error);
        }
    }

}
