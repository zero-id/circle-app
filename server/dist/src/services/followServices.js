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
exports.default = new (class followServices {
    follow(followerId, followingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield db_1.default.follow.findFirst({
                where: {
                    followerId,
                    followingId,
                },
            });
            if (followerId === followingId) {
                throw new Error("You can't follow yourself");
            }
            const user = yield db_1.default.user.count({
                where: {
                    id: followingId,
                },
            });
            if (user === 0) {
                throw new Error("User not found");
            }
            if (exists) {
                yield db_1.default.follow.deleteMany({
                    where: {
                        followerId,
                        followingId,
                    },
                });
                return "unfollowed successfully";
            }
            yield db_1.default.follow.create({
                data: {
                    followerId,
                    followingId,
                },
            });
            return "followed successfully";
        });
    }
    getFollowers(followingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.follow.findMany({
                where: {
                    followingId,
                },
                // include: {
                //   follower: {
                //     include: {
                //       profile: true,
                //     },
                //   },
                //   following: true,
                // },
            });
        });
    }
    getFollowings(followerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.follow.findMany({
                where: {
                    followerId,
                },
                // include: {
                // follower: true,
                // following: true,
                // },
            });
        });
    }
    SuggestionFollow(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const suggestion = yield db_1.default.user.findMany({
                take: 5,
                select: {
                    id: true,
                    fullname: true,
                    username: true,
                    profile: {
                        select: {
                            avatar: true,
                            cover: true,
                            bio: true,
                        },
                    },
                },
                where: {
                    id: {
                        not: userId,
                    },
                    following: {
                        none: {
                            followerId: userId,
                        },
                    },
                },
            });
            return suggestion;
        });
    }
})();
