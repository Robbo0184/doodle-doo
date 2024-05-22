import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import { Types } from 'mongoose';

export default async function handler(request, response) {
    try {
        await dbConnect();

        const { id: userId } = request.query;
        const { sessionId } = request.body;

       

        if (!userId) {
            console.error("User ID is undefined or null");
            return response.status(400).json({ error: "User ID is required" });
        }

        if (!Types.ObjectId.isValid(userId)) {
            console.error("Invalid user ID:", userId);
            return response.status(400).json({ error: "Invalid user ID" });
        }

       
        if (sessionId && !Types.ObjectId.isValid(sessionId)) {
            console.error("Invalid session ID:", sessionId);
            return response.status(400).json({ error: "Invalid session ID" });
        }


        const user = await User.findById(userId);

        if (!user) {
            console.error("User not found with ID:", userId);
            return response.status(404).json({ error: 'User not found' });
        }


        if (request.method === "PATCH") {
            if (!sessionId) {
                console.error("Session ID is required for PATCH method");
                return response.status(400).json({ error: "Session ID is required" });
            }


            const update = user.followers.includes(sessionId)
                ? { $pull: { followers: sessionId } }
                : { $push: { followers: sessionId } };

            const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true }).exec();
            return response.status(200).json(updatedUser);
        } else {
            console.error("Method not allowed:", request.method);
            return response.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error("Internal Server Error:", error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}
