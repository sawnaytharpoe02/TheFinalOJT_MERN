import { Router } from 'express';
import {
	deleteUser,
	updateUser,
	getUser,
	followUser,
	unfollowUser,
} from '../controllers/users.controller';
const router = Router();

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

//follow a user
router.put('/:id/follow', followUser);

//unfollow a user
router.put('/:id/unfollow', unfollowUser);

export default router;
