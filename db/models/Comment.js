import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  userName: String,
  comment: String,
  date: { type: Date, default: Date.now }
  
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;