const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const CommentsSchema = mongoose.Schema({
  description: {
    type: String,
    trim: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Posts",
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
