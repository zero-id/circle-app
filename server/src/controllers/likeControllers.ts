import { Request, Response } from "express";
import { log } from "console";
import likeServices from "../services/likeServices";

export default new (class LikeControllers {
  async find(req: Request, res: Response) {
    try {
      const { threadId } = req.params;
      const likes = await likeServices.find(+threadId);

      return res.status(200).json({ message: "success", data: likes });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { threadId } = req.body;

      const userId = res.locals.user;
      const like = await likeServices.like({ userId, threadId });

      return res.status(201).json({ message: "success", data: like });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async checkLike(req: Request, res: Response) {
    try {
      const { threadId } = req.params;
      const userId = res.locals.user;

      const like = await likeServices.checkLike(+threadId, +userId);

      res.json({
        status: true,
        message: "success",
        data: {
          like,
        },
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }
})();
