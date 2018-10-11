const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const PostSchema = mongoose.Schema({
  image: {
    type: Buffer
  },
  description: {
    type: String,
    trim: true
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
      default: []
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments",
      default: []
    }
  ],
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

const Posts = mongoose.model("Posts", PostSchema);

module.exports = Posts;
