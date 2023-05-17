"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimelinePosts = exports.getUserPosts = exports.getPost = exports.likeDislikePost = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const User_1 = __importDefault(require("../models/User"));
const Post_1 = __importDefault(require("../models/Post"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, desc, img } = req.body;
        const post = {
            userId,
            desc,
            img,
            likes: [],
        };
        const newPost = new Post_1.default(post);
        const savedPost = yield newPost.save();
        res.status(201).json(savedPost);
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (post.userId === req.body.userId) {
            yield post.updateOne({ $set: req.body });
            res.status(200).json('the post has been updated');
        }
        else {
            res.status(403).json('you can update only your post');
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (post.userId === req.body.userId) {
            yield post.deleteOne();
            res.status(200).json('the post has been deleted');
        }
        else {
            res.status(403).json('you can delete only your post');
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deletePost = deletePost;
const likeDislikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const post = yield Post_1.default.findById(req.params.id);
        if (!post.likes.includes(userId)) {
            yield post.updateOne({ $push: { likes: userId } });
            res.status(200).json('The post has been liked');
        }
        else {
            yield post.updateOne({ $pull: { likes: userId } });
            res.status(200).json('The post has been disliked');
        }
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.likeDislikePost = likeDislikePost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.getPost = getPost;
const getUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ username: req.params.username });
        const post = yield Post_1.default.find({ userId: user._id });
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.getUserPosts = getUserPosts;
const getTimelinePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield User_1.default.findById(req.params.userId);
        const userPosts = yield Post_1.default.find({ userId: currentUser._id });
        const friendPosts = yield Promise.all(currentUser.followings.map((friendId) => {
            return Post_1.default.find({ userId: friendId });
        }));
        res.status(200).json(userPosts.concat(...friendPosts));
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.getTimelinePosts = getTimelinePosts;
