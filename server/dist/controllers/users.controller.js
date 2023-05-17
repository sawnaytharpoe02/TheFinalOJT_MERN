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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollowUser = exports.followUser = exports.deleteUser = exports.updateUser = exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { userId, password, isAdmin } = req.body;
    if (userId === req.params.id || isAdmin) {
        if (password) {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                req.body.password = yield bcrypt_1.default.hash(password, salt);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            yield User_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json({ msg: 'Account has been updated' });
        }
        catch (err) {
            return res.status(500).json(err.message);
        }
    }
    else {
        return res.status(403).json('You can update only your account!');
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, isAdmin } = req.body;
    if (userId === req.params.id || isAdmin) {
        try {
            yield User_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json('Account has been deleted');
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json('You can delete only your account!');
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? yield User_1.default.findById(userId)
            : yield User_1.default.findOne({ username: username });
        const _a = user._doc, { password, updatedAt } = _a, other = __rest(_a, ["password", "updatedAt"]);
        res.status(200).json(other);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getUser = getUser;
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (userId !== req.params.id) {
        try {
            const user = yield User_1.default.findById(req.params.id);
            const currentUser = yield User_1.default.findById(userId);
            if (!user.followers.includes(userId)) {
                yield user.updateOne({ $push: { followers: userId } });
                yield currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json('user has been followed');
            }
            else {
                res.status(403).json('you allready follow this user');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json('you cannot follow yourself');
    }
});
exports.followUser = followUser;
const unfollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (userId !== req.params.id) {
        try {
            const user = yield User_1.default.findById(req.params.id);
            const currentUser = yield User_1.default.findById(userId);
            if (user.followers.includes(userId)) {
                yield user.updateOne({ $pull: { followers: userId } });
                yield currentUser.updateOne({
                    $pull: { followings: req.params.id },
                });
                res.status(200).json('user has been unfollowed');
            }
            else {
                res.status(403).json('you dont follow this user');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json('you cannot unfollow yourself');
    }
});
exports.unfollowUser = unfollowUser;
