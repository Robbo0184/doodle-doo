import mongoose from "mongoose";
import Comment from "./Comment.js";

const { Schema } = mongoose;

const tweetSchema = new Schema({
  userName: String,
  tweet: String,
  image: String,
  date: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],  
  comments: {type: [Schema.Types.ObjectId], ref: Comment }
});

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export default Tweet;