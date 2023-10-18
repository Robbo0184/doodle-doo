import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import Tweet from "../../../../db/models/Tweet";


export default async function handler(request, response) {
    
    await dbConnect()


    if (request.method === "GET") {
        const users = await User.find();
       

        if (!users) {
            return response.status(404).json({ status: "Not found" })
        }
        return response.status(200).json(users)

    }
}