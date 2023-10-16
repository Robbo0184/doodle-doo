import dbConnect from "../../../../../db/connect";
import User from "../../../../../db/models/User";
import Tweet from "../../../../../db/models/Tweet";


export default async function handler(request, response) {
    await dbConnect()
    const {id} = request.query;
   
    
    if(!id) {
        return;
    }

    if (request.method === "GET") {
        const user = await User.findById(id);
        log(user)
        if (!user) {
            return response.status(404).json({ status: "Not found"})
        }
        response.status(200).json(user)
       
    }
  }