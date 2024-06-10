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
exports.default = new (class userServices {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.user.findMany({
                include: {
                    profile: true,
                    _count: {
                        select: {
                            follower: true,
                            following: true,
                        },
                    },
                    follower: true,
                    following: true,
                    thread: {
                        include: {
                            author: {
                                select: {
                                    username: true,
                                    fullname: true,
                                    id: true,
                                    profile: true,
                                },
                            },
                            image: {
                                select: {
                                    image: true,
                                },
                            },
                            _count: {
                                select: {
                                    like: true,
                                    replies: true,
                                },
                            },
                        },
                    },
                },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.user.findFirst({
                where: {
                    id,
                },
                include: {
                    profile: true,
                    _count: {
                        select: {
                            follower: true,
                            following: true,
                        },
                    },
                    follower: true,
                    following: true,
                    like: true,
                    thread: true,
                },
            });
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUsername = yield db_1.default.user.findFirst({
                where: {
                    username: payload.username,
                },
            });
            if (checkUsername && checkUsername.id !== id) {
                throw new Error("Username already exists");
            }
            return yield db_1.default.user.update({
                where: {
                    id,
                },
                data: Object.assign({}, payload),
            });
        });
    }
    findProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.profile.findFirst({
                where: {
                    userId: userId,
                },
                include: {
                    user: {
                        select: {
                            username: true,
                            fullname: true,
                            id: true,
                        },
                    },
                },
            });
        });
    }
    updateProfile(userId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.profile.update({
                where: {
                    userId,
                },
                data: Object.assign({}, payload),
            });
        });
    }
    searchUser(search, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.user.findMany({
                where: {
                    AND: [
                        {
                            NOT: {
                                id: userId,
                            },
                        },
                        {
                            OR: [
                                {
                                    fullname: {
                                        contains: search,
                                    },
                                },
                                {
                                    username: {
                                        contains: search,
                                    },
                                },
                            ],
                        },
                    ],
                },
            });
        });
    }
})();
