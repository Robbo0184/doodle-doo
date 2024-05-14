import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import { Types } from 'mongoose';


export default async function handler(request, response) {
    try {
        await dbConnect();

        const { id: userId } = request.query;
        const { sessionId } = request.body;

        if (!Types.ObjectId.isValid(userId)) {
            return response.status(400).json({ error: 'Invalid user ID' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        if (request.method === "GET") {
            const populatedUser = await user.populate({
                path: "followers",
                model: "User",
            });
            return response.status(200).json(populatedUser);
        } else if (request.method === "PATCH") {
            const update = user.followers.includes(sessionId)
                ? { $pull: { followers: sessionId } }
                : { $push: { followers: sessionId } };

            const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true }).exec();
            return response.status(200).json(updatedUser);
        } else {
            return response.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}
