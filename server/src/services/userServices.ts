import db from "../db";
import { IProfile } from "../types/app";

export default new (class userServices {
  async findAll() {
    return await db.user.findMany({
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
  }

  async findById(id: number) {
    return await db.user.findFirst({
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
  }

  async update(id: number, payload: any) {
    const checkUsername = await db.user.findFirst({
      where: {
        username: payload.username,
      },
    });



    if (checkUsername && checkUsername.id !== id) {
      throw new Error("Username already exists");
    }
    
    return await db.user.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
  }

  async findProfile(userId: number) {
    return await db.profile.findFirst({
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
  }
  async updateProfile(userId: number, payload: IProfile) {
    return await db.profile.update({
      where: {
        userId,
      },
      data: {
        ...payload,
      },
    });
  }

  async searchUser(search: string, userId: number) {
    return await db.user.findMany({
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
  }
})();
