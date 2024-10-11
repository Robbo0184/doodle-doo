import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import Comment from "../../../../db/models/Comment";

async function populateComments(comments) {
    return Promise.all(comments.map(async comment => {
        const populatedComment = await Comment.findById(comment._id)
            .populate({
                path: 'commentUserId',
                select: 'image name'
            })
            .lean(); 

        if (populatedComment.comments && populatedComment.comments.length > 0) {
            populatedComment.comments = await populateComments(populatedComment.comments);
        }

        return populatedComment;
    }));
}

export default async function handler(request, response) {
    await dbConnect();

    if (request.method === "GET") {
        try {
            const users = await User.find().populate({
                path: "tweets",
                populate: {
                    path: "comments",
                    model: "Comment",
                    populate: {
                        path: "commentUserId",
                        model: "User",
                        select: 'image'
                    }
                }
            }).lean();

            for (const user of users) {
                for (const tweet of user.tweets) {
                    tweet.comments = await populateComments(tweet.comments);
                }
            }

            response.status(200).json(users);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        response.status(405).json({ error: `Method ${request.method} Not Allowed` });
    }
}
