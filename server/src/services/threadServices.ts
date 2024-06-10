import { log } from "console";
import db from "../db";
import { IThread } from "../types/app";
import { v2 as cloudinary } from "cloudinary";

export default new (class threadServices {
  async findAll() {
    return await db.thread.findMany({
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
  }

  async findById(id: number) {
    return await db.thread.findFirst({
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
  }

  async create(
    payload: IThread,
    files: { [fieldname: string]: Express.Multer.File[] }
  ) {
    let imageUrls: string[] = [];

    // Jika ada file gambar, unggah ke Cloudinary
    if (files.image) {
      for (const image of files.image) {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          "./src/uploads/" + image.filename
        );
        imageUrls.push(cloudinaryResponse.secure_url);
      }
    }

    const thread = await db.thread.create({
      data: {
        ...payload,
        threadId: payload.threadId ? Number(payload.threadId) : null,
      },
    });

    if (files.image) {
      await db.threadImage.createMany({
        data: imageUrls.map((image) => ({
          image: image,
          threadId: thread.id,
        })),
      });
    }

    if (files) {
      if (files.image) {
        files.image.map(async (image) => {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            "./src/uploads/" + image.filename
          );
        });
      }
    }

    return thread;
  }

  async delete(id: number) {
    const thread = await db.thread.findFirst({ where: { id } });
    if (!thread) {
      throw new Error("Thread not found");
    }

    if (thread.userId !== id) {
      throw new Error("You are not authorized to delete this thread");
    }

    await db.thread.delete({ where: { id } });

    await db.threadImage.deleteMany({ where: { threadId: id } });
  }

  async findReplies(threadId: number) {
    return await db.thread.findMany({
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
