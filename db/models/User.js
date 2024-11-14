import mongoose from "mongoose";
import Tweet from "./Tweet";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  image: String,
  coverImage: String,
  bio: String,
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tweets: {type: [Schema.Types.ObjectId], ref: Tweet },
  images: [{type: String}],
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;