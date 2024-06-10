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
exports.default = new (class likeServices {
    find(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.like.findMany({
                where: {
                    threadId,
                },
                include: {
                    user: {
                        select: {
                            username: true,
                            fullname: true,
                            id: true,
                            profile: {
                                select: {
                                    avatar: true,
                                },
                            },
                        },
                    },
                },
            });
        });
    }
    like(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExists = yield db_1.default.thread.findFirst({
                where: {
                    id: payload.threadId,
                },
            });
            if (!isExists) {
                throw new Error("Thread not found");
            }
            const like = yield db_1.default.like.findFirst({
                where: {
                    userId: payload.userId,
                    threadId: payload.threadId,
                },
            });
            if (like) {
                yield db_1.default.like.deleteMany({
                    where: {
                        userId: payload.userId,
                        threadId: payload.threadId,
                    },
                });
                return "unliked";
            }
            yield db_1.default.like.create({
                data: Object.assign({}, payload),
            });
            return "liked";
        });
    }
    checkLike(threadId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.like.findFirst({
                where: {
                    threadId,
                    userId,
                },
            });
        });
    }
})();
// export const getLikes = async (threadId: number) => {
//   return await db.like.findMany({
//     where: {
//       threadId,
//     },
//     include: {
//       user: {
//         select: {
//           username: true,
//           fullname: true,
//           id: true,
//         },
//         include: {
//           profile: {
//             select: {
//               avatar: true,
//             },
//           },
//         },
//       },
//     },
//   });
// };
// export const createLike = async (payload: {
//   userId: number;
//   threadId: number;
// }) => {
//   const isExists = await db.thread.findFirst({
//     where: {
//       id: payload.threadId,
//     },
//   });
//   if (!isExists) {
//     throw new Error("Thread not found");
//   }
//   const like = await db.like.findFirst({
//     where: {
//       userId: payload.userId,
//       threadId: payload.threadId,
//     },
//   });
//   if (like) {
//     await db.like.deleteMany({
//       where: {
//         userId: payload.userId,
//         threadId: payload.threadId,
//       },
//     });
//     return "unliked";
//   }
//   await db.like.create({
//     data: {
//       ...payload,
//     },
//   });
//   return "liked";
// };
