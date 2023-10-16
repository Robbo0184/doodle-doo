import mongoose from "mongoose";

const { Schema } = mongoose;

const tweetSchema = new Schema({
  name: String,
  comment: String
});

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export default Tweet;