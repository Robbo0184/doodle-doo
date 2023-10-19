import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";


export default async function handler(request, response) {
    
    await dbConnect()


    if (request.method === "GET") {
        const users = await User.find().populate('tweets');
       console.log("users from backend", users);

        if (!users) {
            return response.status(404).json({ status: "Not found" })
        }
        return response.status(200).json(users)

    }
}