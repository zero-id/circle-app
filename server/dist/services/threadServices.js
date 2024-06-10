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
const cloudinary_1 = require("cloudinary");
exports.default = new (class threadServices {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.thread.findMany({
                orderBy: {
                    id: "desc",
                },
                include: {
                    image: {
                        select: {
                            image: true,
                        },
                    },
                    author: {
                        select: {
                            id: true,
                            username: true,
                            fullname: true,
                            profile: true,
                        },
                    },
                    _count: {
                        select: {
                            replies: true,
                            like: true,
                        },
                    },
                    replies: {
                        include: {
                            author: {
                                select: {
                                    id: true,
                                    username: true,
                                    fullname: true,
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
                    like: true,
                },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.thread.findFirst({
                where: {
                    id: id,
                },
                orderBy: {
                    id: "desc",
                },
                include: {
                    image: {
                        select: {
                            image: true,
                        },
                    },
                    author: {
                        select: {
                            id: true,
                            username: true,
                            fullname: true,
                            profile: true,
                        },
                    },
                    _count: {
                        select: {
                            replies: true,
                            like: true,
                        },
                    },
                    replies: {
                        orderBy: {
                            id: "desc",
                        },
                        include: {
                            author: {
                                select: {
                                    id: true,
                                    username: true,
                                    fullname: true,
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
                                },
                            },
                            like: true,
                        },
                    },
                    like: true,
                },
            });
        });
    }
    create(payload, files) {
        return __awaiter(this, void 0, void 0, function* () {
            let imageUrls = [];
            // Jika ada file gambar, unggah ke Cloudinary
            if (files.image) {
                for (const image of files.image) {
                    const cloudinaryResponse = yield cloudinary_1.v2.uploader.upload("./src/uploads/" + image.filename);
                    imageUrls.push(cloudinaryResponse.secure_url);
                }
            }
            const thread = yield db_1.default.thread.create({
                data: Object.assign(Object.assign({}, payload), { threadId: payload.threadId ? Number(payload.threadId) : null }),
            });
            if (files.image) {
                yield db_1.default.threadImage.createMany({
                    data: imageUrls.map((image) => ({
                        image: image,
                        threadId: thread.id,
                    })),
                });
            }
            if (files) {
                if (files.image) {
                    files.image.map((image) => __awaiter(this, void 0, void 0, function* () {
                        const cloudinaryResponse = yield cloudinary_1.v2.uploader.upload("./src/uploads/" + image.filename);
                    }));
                }
            }
            return thread;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const thread = yield db_1.default.thread.findFirst({ where: { id } });
            if (!thread) {
                throw new Error("Thread not found");
            }
            if (thread.userId !== id) {
                throw new Error("You are not authorized to delete this thread");
            }
            yield db_1.default.thread.delete({ where: { id } });
            yield db_1.default.threadImage.deleteMany({ where: { threadId: id } });
        });
    }
    findReplies(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.thread.findMany({
                where: {
                    threadId,
                },
                include: {
                    image: {
                        select: {
                            image: true,
                        },
                    },
                    author: {
                        select: {
                            id: true,
                            username: true,
                            fullname: true,
                            profile: true,
                        },
                    },
                    _count: {
                        select: {
                            replies: true,
                        },
                    },
                },
            });
        });
    }
})();
// export const getThreads = async () => {
//   return await db.thread.findMany({
//     where: {
//       threadId: null,
//     },
//     include: {
//       image: {
//         select: {
//           image: true,
//         },
//       },
//       _count: {
//         select: {
//           replies: true,
//           like: true,
//         },
//       },
//     },
//   });
// };
// export const getThread = async (id: number) => {
//   return await db.thread.findFirst({
//     where: {
//       id: id,
//       threadId: null,
//     },
//     include: {
//       image: {
//         select: {
//           image: true,
//         },
//       },
//     },
//   });
// };
// export const createThread = async (
//   payload: IThread,
//   files: { [fieldname: string]: Express.Multer.File[] }
// ) => {
//   const thread = await db.thread.create({
//     data: {
//       ...payload,
//       threadId: payload.threadId ? Number(payload.threadId) : null,
//     },
//   });
//   if (files) {
//     await db.threadImage.createMany({
//       data: files.image.map((image) => ({
//         image: image.filename,
//         threadId: thread.id,
//       })),
//     });
//   }
//   return thread;
// };
// export const deleteThread = async (id: number) => {
//   const thread = await db.thread.findFirst({ where: { id } });
//   if (!thread) {
//     throw new Error("Thread not found");
//   }
//   if (thread.userId !== id) {
//     throw new Error("You are not authorized to delete this thread");
//   }
//   await db.thread.delete({ where: { id } });
//   await db.threadImage.deleteMany({ where: { threadId: id } });
// };
// export const getReplies = async (threadId: number) => {
//   return await db.thread.findMany({
//     where: {
//       threadId,
//     },
//     include: {
//       image: {
//         select: {
//           image: true,
//         },
//       },
//       _count: {
//         select: {
//           replies: true,
//         },
//       },
//     },
//   });
// };
