import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  image: String,
  coverImage: String,
  tweets: {type: [Schema.Types.ObjectId], ref: "Tweet" }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;