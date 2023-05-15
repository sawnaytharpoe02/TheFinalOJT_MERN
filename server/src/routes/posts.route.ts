import { Router } from 'express';
import {
	createPost,
	getPost,
	updatePost,
	deletePost,
	getTimelinePosts,
	likeDislikePost,
} from '../controllers/posts.controller';
import { verifyToken } from '../middlewares/auth';
import { uploadSingleFile } from '../middlewares/upload';

const router = Router();

//create a post
router.post('/', [verifyToken, uploadSingleFile, createPost]);

router
	.route('/:id')
	.get(getPost)
	.put([verifyToken, updatePost])
	.delete([verifyToken, deletePost]);

//like / dislike a post
router.put('/:id/like', likeDislikePost);

//get timeline posts
router.get('/timeline/:userId', getTimelinePosts);

export default router;
