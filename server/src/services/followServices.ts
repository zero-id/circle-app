import db from "../db";

export default new (class followServices {
  async follow(followerId: number, followingId: number) {
    const exists = await db.follow.findFirst({
      where: {
        followerId,
        followingId,
      },
    });

    if (followerId === followingId) {
      throw new Error("You can't follow yourself");
    }

    const user = await db.user.count({
      where: {
        id: followingId,
      },
    });

    if (user === 0) {
      throw new Error("User not found");
    }

    if (exists) {
      await db.follow.deleteMany({
        where: {
          followerId,
          followingId,
        },
      });

      return "unfollowed successfully";
    }

    await db.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    return "followed successfully";
  }

  async getFollowers(followingId: number) {
    return await db.follow.findMany({
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
  }

  async getFollowings(followerId: number) {
    return await db.follow.findMany({
      where: {
        followerId,
      },
      // include: {
        // follower: true,
        // following: true,
      // },
    });
  }

  async SuggestionFollow(userId: number) {
    const suggestion = await db.user.findMany({
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
  }
})();
