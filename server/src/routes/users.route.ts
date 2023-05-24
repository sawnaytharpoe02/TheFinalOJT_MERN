import { Router } from 'express';
import {
  deleteUser,
  updateUser,
  getUser,
  followUser,
  unfollowUser,
  getFriendsList,
} from '../controllers/users.controller';
const router = Router();
import { verifyToken } from '../middlewares/auth';

//query a user
router.get('/', getUser);

//get user's friend lists
router.get('/friends/:userId', getFriendsList);

router
  .route('/:id')
  .put([verifyToken, updateUser])
  .delete([verifyToken, deleteUser]);

//follow a user
router.put('/:id/follow', followUser);

//unfollow a user
router.put('/:id/unfollow', unfollowUser);

export default router;
