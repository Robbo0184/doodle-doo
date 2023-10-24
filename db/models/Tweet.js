import mongoose from "mongoose";
import User from "./User";
import Comment from "./Comment";

const { Schema } = mongoose;

const tweetSchema = new Schema({
  userName: String,
  tweet: String,
  date: { type: Date, default: Date.now },
  likes: [String],
  comments: {type: [Schema.Types.ObjectId], ref: Comment }
});

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export default Tweet;