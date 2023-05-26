"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_controller_1 = require("../controllers/posts.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/', [auth_1.verifyToken, posts_controller_1.createPost]);
router
    .route('/:id')
    .get(posts_controller_1.getPost)
    .put([auth_1.verifyToken, posts_controller_1.updatePost])
    .delete([auth_1.verifyToken, posts_controller_1.deletePost]);
router.put('/:id/like', posts_controller_1.likeDislikePost);
router.get('/profile/:username', posts_controller_1.getUserPosts);
router.get('/timeline/:userId', posts_controller_1.getTimelinePosts);
router.post('/:postId/comments', posts_controller_1.comment);
router.delete('/:postId/comments/:commentId', posts_controller_1.uncomment);
exports.default = router;
