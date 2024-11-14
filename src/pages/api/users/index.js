import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import Comment from "../../../../db/models/Comment";

async function populateComments(comments) {
    
    if (!comments || !Array.isArray(comments)) {
        return [];
    }

    return Promise.all(comments.map(async comment => {
       
        if (!comment || !comment._id) {
            return null;
        }

        try {
            const populatedComment = await Comment.findById(comment._id)
                .populate({
                    path: 'commentUserId',
                    select: 'image name'
                })
                .lean();

           
            if (!populatedComment) {
                return null;
            }

            
            if (populatedComment.comments && populatedComment.comments.length > 0) {
                populatedComment.comments = await populateComments(populatedComment.comments);
            }

            return populatedComment;
        } catch (error) {
            console.error(`Error populating comment ${comment._id}:`, error);
            return null;
        }
    })).then(comments => comments.filter(Boolean)); 
}

export default async function handler(request, response) {
    await dbConnect();

    if (request.method === "GET") {
        try {
            const users = await User.find()
                .populate({
                    path: "tweets",
                    populate: {
                        path: "comments",
                        model: "Comment",
                        populate: {
                            path: "commentUserId",
                            model: "User",
                            select: 'image name'
                        }
                    }
                })
                .lean();

            
            for (const user of users) {
                if (user.tweets && Array.isArray(user.tweets)) {
                    for (const tweet of user.tweets) {
                        if (tweet.comments) {
                            tweet.comments = await populateComments(tweet.comments);
                        }
                    }
                }
            }

            response.status(200).json(users);
        } catch (error) {
            console.error("Error in users GET handler:", error);
            response.status(500).json({ error: "Internal Server Error" });
        }
    }
}