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

        if (!sessionId) {
            console.error("Session ID is required for PATCH method");
            return response.status(400).json({ error: "Session ID is required" });
        }

        if (!Types.ObjectId.isValid(sessionId)) {
            console.error("Invalid session ID:", sessionId);
            return response.status(400).json({ error: "Invalid session ID" });
        }

        const userToFollow = await User.findById(userId);
        const follower = await User.findById(sessionId);

        if (!userToFollow) {
            console.error("User not found with ID:", userId);
            return response.status(404).json({ error: 'User not found' });
        }

        if (!follower) {
            console.error("User not found with ID:", sessionId);
            return response.status(404).json({ error: 'User not found' });
        }

        if (request.method === "PATCH") {
            
            if (!userToFollow.followers) {
                userToFollow.followers = [];
            }
            if (!follower.following) {
                follower.following = [];
            }

            const isFollowing = userToFollow.followers.includes(sessionId);

            const followerUpdate = isFollowing
                ? { $pull: { followers: sessionId } }
                : { $push: { followers: sessionId } };

            const followingUpdate = isFollowing
                ? { $pull: { following: userId } }
                : { $push: { following: userId } };

            const updatedUserFollowers = await User.findByIdAndUpdate(userId, followerUpdate, { new: true }).exec();
            const fullyUpdatedUser = await User.findByIdAndUpdate(sessionId, followingUpdate, { new: true }).exec();

            return response.status(200).json({ updatedUserFollowers, fullyUpdatedUser });
        } else {
            console.error("Method not allowed:", request.method);
            return response.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error("Internal Server Error:", error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}
