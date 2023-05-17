import { Router } from 'express';
import {
	deleteUser,
	updateUser,
	getUser,
	followUser,
	unfollowUser,
} from '../controllers/users.controller';
const router = Router();
import { verifyToken } from '../middlewares/auth';

//query a user
router.get('/', getUser);

router
	.route('/:id')
	.put([verifyToken, updateUser])
	.delete([verifyToken, deleteUser]);

//follow a user
router.put('/:id/follow', followUser);

//unfollow a user
router.put('/:id/unfollow', unfollowUser);

export default router;
