"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
router.route('/:id').get(users_controller_1.getUser).put(users_controller_1.updateUser).delete(users_controller_1.deleteUser);
router.put('/:id/follow', users_controller_1.followUser);
router.put('/:id/unfollow', users_controller_1.unfollowUser);
exports.default = router;
