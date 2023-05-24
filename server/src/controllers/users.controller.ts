import User from '../models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

// UPDATE USER
const updateUser = async (req: Request, res: Response) => {
  let { userId, password, isAdmin } = req.body;
  if (userId === req.params.id || isAdmin) {
    if (password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({ msg: 'Account has been updated' });
    } catch (err: any) {
      return res.status(500).json(err.message);
    }
  } else {
    return res.status(403).json('You can update only your account!');
  }
};

// DELETE USER
const deleteUser = async (req: Request, res: Response) => {
  const { userId, isAdmin } = req.body;
  if (userId === req.params.id || isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Account has been deleted');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can delete only your account!');
  }
};

// GET USER
// lh:8800/api/users?username= || lh:8800/api/users?userId=
const getUser = async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });

    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

// FOLLOW A USER
const followUser = async (req: Request, res: Response) => {
  const { userId } = req.body; // this is my userId
  if (userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(userId);

      if (!user.followers.includes(userId)) {
        await user.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json('user has been followed');
      } else {
        res.status(403).json('you allready follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cannot follow yourself');
  }
};

// UNFOLLOW A USER
const unfollowUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(userId);
      if (user.followers.includes(userId)) {
        await user.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({
          $pull: { followings: req.params.id },
        });
        res.status(200).json('user has been unfollowed');
      } else {
        res.status(403).json('you dont follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cannot unfollow yourself');
  }
};

// GET FRIEND LIST
const getFriendsList = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId: string) => {
        return User.findById(friendId);
      })
    );

    let friendList: {
      _id: String;
      username: String;
      profilePicture: String;
    }[] = [];

    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getFriendsList,
};
