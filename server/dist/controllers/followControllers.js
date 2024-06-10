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
const db_1 = __importDefault(require("../db"));
const followServices_1 = __importDefault(require("../services/followServices"));
exports.default = new (class FollowControllers {
    follow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followingId = req.body.followingId;
                const followerId = res.locals.user;
                const follow = yield followServices_1.default.follow(followerId, followingId);
                res.status(201).json({
                    data: follow,
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getFollowers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followingId = res.locals.user;
                const followers = yield db_1.default.follow.findMany({
                    where: {
                        followingId: +followingId,
                    },
                    select: {
                        follower: {
                            select: {
                                id: true,
                                fullname: true,
                                username: true,
                                profile: {
                                    select: {
                                        avatar: true,
                                    },
                                },
                            },
                        },
                    },
                });
                res.json({
                    message: "followers",
                    data: followers,
                });
            }
            catch (error) {
                res.status(500).json({ error: error });
            }
        });
    }
    getFollowings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followerId = res.locals.user;
                const followings = yield db_1.default.follow.findMany({
                    where: {
                        followerId: +followerId,
                    },
                    select: {
                        following: {
                            select: {
                                id: true,
                                fullname: true,
                                username: true,
                                profile: {
                                    select: {
                                        avatar: true,
                                    },
                                },
                            },
                        },
                    },
                });
                res.json({
                    success: true,
                    message: "followings",
                    data: followings,
                });
            }
            catch (error) {
                const err = error;
                res.status(500).json({
                    success: false,
                    error: err.message,
                });
            }
        });
    }
    SuggetionFollow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = res.locals.user;
                const suggestion = yield followServices_1.default.SuggestionFollow(+userId);
                res.json({
                    status: true,
                    message: "success",
                    data: suggestion,
                });
            }
            catch (error) {
                const err = error;
                res.json({
                    status: false,
                    message: err.message,
                });
            }
        });
    }
})();
