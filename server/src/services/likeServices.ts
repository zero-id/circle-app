import db from "../db";

export default new (class likeServices {
  async find(threadId: number) {
    return await db.like.findMany({
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
  }

  async like(payload: { threadId: number; userId: number }) {
    const isExists = await db.thread.findFirst({
      where: {
        id: payload.threadId,
      },
    });

    if (!isExists) {
      throw new Error("Thread not found");
    }

    const like = await db.like.findFirst({
      where: {
        userId: payload.userId,
        threadId: payload.threadId,
      },
    });

    if (like) {
      await db.like.deleteMany({
        where: {
          userId: payload.userId,
          threadId: payload.threadId,
        },
      });

      return "unliked";
    }

    await db.like.create({
      data: {
        ...payload,
      },
    });

    return "liked";
  }

  async checkLike(threadId: number, userId: number) {
    return await db.like.findFirst({
      where: {
        threadId,
        userId,
      },
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
