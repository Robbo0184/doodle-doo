import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";



export default async function handler(request, response) {
    await dbConnect();

    if (request.method === "GET") {
        try {
            const users = await User.find().populate({
                path: "tweets",
                populate: {
                    path: "comments",
                    model: "Comment",
                    populate: [
                        {
                            path: "commentUserId",
                            model: "User",
                            select: 'image'
                        },
                        {
                            path: "comments",
                            model: "Comment",
                            select: "commentUserId comment likes comments date",
                            populate: {
                                path: "commentUserId",
                                model: "User",
                                select: 'image name'
                            }
                        }
                    ]
                }
            });

            response.status(200).json(users);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        response.status(405).json({ error: `Method ${request.method} Not Allowed` });
    }
}