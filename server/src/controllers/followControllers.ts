import { Request, Response } from "express";
import db from "../db";
import { log } from "console";
import followServices from "../services/followServices";

export default new (class FollowControllers {
  async follow(req: Request, res: Response) {
    try {
      const followingId = req.body.followingId;

      const followerId = res.locals.user;

      const follow = await followServices.follow(followerId, followingId);

      res.status(201).json({
        data: follow,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getFollowers(req: Request, res: Response) {
    try {
      const followingId = res.locals.user;

      const followers = await db.follow.findMany({
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
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async getFollowings(req: Request, res: Response) {
    try {
      const followerId = res.locals.user;

      const followings = await db.follow.findMany({
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
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
  async SuggetionFollow(req: Request, res: Response) {
    try {
      const userId = res.locals.user;
      const suggestion = await followServices.SuggestionFollow(+userId);

      res.json({
        status: true,
        message: "success",
        data: suggestion,
      });
    } catch (error) {
      const err = error as unknown as Error;

      res.json({
        status: false,
        message: err.message,
      });
    }
  }
})();
