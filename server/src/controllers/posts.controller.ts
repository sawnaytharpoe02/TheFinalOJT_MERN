import { Request, Response } from 'express';
import User from '../models/User';
import Post from '../models/Post';
import { PostCreate } from '../interface/post';

// CREATE A POST
const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, desc, img } = req.body;

    const post: PostCreate = {
      userId,
      desc,
      img,
      likes: [],
    };
    const newPost = new Post(post);

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }
};

// UPDATE A POST
const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      // await post.updateOne({ $set: req.body });
      await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json('the post has been updated');
    } else {
      res.status(403).json('you can update only your post');
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE A POST
const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.findByIdAndDelete(post._id);
      res.status(200).json('the post has been deleted');
    } else {
      res.status(403).json('you can delete only your post');
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// LIKE/DISLIKE A POST
const likeDislikePost = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json('The post has been liked');
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json('The post has been disliked');
    }
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// GET A POST
const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// GET USER'S POSTS
const getUserPosts = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const post = await Post.find({ userId: user._id }).sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// GET TIMELINE POSTS
const getTimelinePosts = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id }).sort({
      createdAt: -1,
    });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId: any) => {
        return Post.find({ userId: friendId }).sort({ createdAt: -1 });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// COMMENT
const comment = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const { text, postedBy } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const newComment = {
      text,
      postedBy,
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err: any) {
    res.status(500).json({
      message: 'An error occurred while adding the comment',
      error: err.message,
    });
  }
};

// UNCOMMENT
const uncomment = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = post.comments.find(
      (comment: any) => comment._id.toString() === commentId
    );
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    post.comments = post.comments.filter(
      (comment: any) => comment._id.toString() !== commentId
    );
    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err: any) {
    res.status(500).json({
      message: 'An error occurred while deleting the comment',
      error: err.message,
    });
  }
};

export {
  createPost,
  updatePost,
  deletePost,
  likeDislikePost,
  getPost,
  getUserPosts,
  getTimelinePosts,
  comment,
  uncomment,
};
