import mongoose, { Schema } from 'mongoose';

// Define the Comment schema
const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
    // Embed the Comment schema within the Post schema
  },
  { timestamps: true }
);

const Post = mongoose.model('post', PostSchema);
export default Post;
