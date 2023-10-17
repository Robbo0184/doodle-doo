import dbConnect from "../../../../../db/connect";
import User from "../../../../../db/models/User";
import Tweet from "../../../../../db/models/Tweet";


export default async function handler(request, response) {
    await dbConnect()
    const {id} = request.query;
   console.log("i am looging id:", id);
    
    if(!id) {
        return;
    }

    if (request.method === "GET") {
        const user = await User.findById(id);
        console.log("user", user)
        if (!user) {
            return response.status(404).json({ status: "Not found"})
        }
        response.status(200).json(user)
       
    }
  }