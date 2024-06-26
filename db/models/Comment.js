import mongoose from "mongoose";


const { Schema } = mongoose;

const commentSchema = new Schema({
  userName: String,
  commentUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: String,
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  date: { type: Date, default: Date.now }
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;