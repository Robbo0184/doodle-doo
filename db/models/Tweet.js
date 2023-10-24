import mongoose from "mongoose";
import User from "./User";

const { Schema } = mongoose;

const tweetSchema = new Schema({
  userName: String,
  tweet: String,
  date: { type: Date, default: Date.now },
  likes: [String]
});

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export default Tweet;