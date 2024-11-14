import mongoose from "mongoose";
;

const { Schema } = mongoose;

const commentSchema = new Schema({
  userName: String,
  commentUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: String,
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
    required: true
  },
  parentCommentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  date: { type: Date, default: Date.now }
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment