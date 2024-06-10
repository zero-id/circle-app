import { Request, Response } from "express";
import { IThread } from "../types/app";
import threadServices from "../services/threadServices";

export default new (class ThreadControllers {
  async findAll(req: Request, res: Response) {
    try {
      const threads = await threadServices.findAll();

      return res.status(200).json({ message: "success", data: threads });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const thread = await threadServices.findById(+id);

      return res.status(200).json({ message: "success", data: thread });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { body } = req;
      body.userId = res.locals.user;

      const thread = await threadServices.create(
        body,
        req.files as { [fieldname: string]: Express.Multer.File[] }
      );

      return res.status(201).json({ message: "success", data: thread });
    } catch (error: any) {
      console.log(error);

      return res.status(500).json({ error: error.message });
    }
  }

  async findReplies(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const replies = await threadServices.findReplies(+id);

      return res.status(200).json({ message: "success", data: replies });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
})();
// export const getThreads = async (req: Request, res: Response) => {
//   try {
//     const threads = await threadServices.getThreads();

//     return res.status(200).json({ message: "success", data: threads });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// export const getThread = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const thread = await threadServices.getThread(+id);

//     return res.status(200).json({ message: "success", data: thread });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// export const createThread = async (req: Request, res: Response) => {
// try {
//   const { body } = req;
//   body.userId = res.locals.user;

//   const thread = await threadServices.createThread(
//     body,
//     req.files as { [fieldname: string]: Express.Multer.File[] }
//   );

//   return res.status(201).json({ message: "success", data: thread });
// } catch (error: any) {
//   console.log(error);

//   return res.status(500).json({ error: error.message });
// }
// };

// export const getReplies = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const replies = await threadServices.getReplies(+id);

//     return res.status(200).json({ message: "success", data: replies });
//   } catch (error) {
//     return res.status(500).json({ error: error });
//   }
// };
