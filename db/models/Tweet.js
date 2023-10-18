import mongoose from "mongoose";

const { Schema } = mongoose;

const tweetSchema = new Schema({
  name: String,
  tweet: String,
  date: { type: Date, default: Date.now }
});

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export default Tweet;