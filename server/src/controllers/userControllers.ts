import { Request, Response } from "express";
import db from "../db";
import { v2 as cloudinary } from "cloudinary";
import { IProfile } from "../types/app";
import userServices from "../services/userServices";

export default new (class UserController {
  async findAll(req: Request, res: Response) {
    try {
      const users = await userServices.findAll();

      return res.status(200).json({ message: "success", data: users });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = res.locals.user;
      const user = await userServices.findById(+id);

      return res.status(200).json({ message: "success", data: user });
    } catch (error: any) {}
  }

  async update(req: Request, res: Response) {
    try {
      const id = res.locals.user;
      const data: {
        fullname?: string;
        username?: string;
      } = req.body;

      const user = await userServices.update(+id, data);

      return res.status(200).json({ message: "success", data: user });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findProfile(req: Request, res: Response) {
    try {
      const userId = res.locals.user;
      const profile = await userServices.findProfile(+userId);

      return res.status(200).json({ message: "success", data: profile });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = res.locals.user;

      const data: IProfile = req.body;
      const files = req?.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      if (files.cover) {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          "./src/uploads/" + files.cover[0].filename
        );
        data.cover = cloudinaryResponse.secure_url;
      }

      if (files.avatar) {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          "./src/uploads/" + files.avatar[0].filename
        );
        data.avatar = cloudinaryResponse.secure_url;
      }

      await userServices.updateProfile(userId, data);

      return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async searchUser(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const userId = res.locals.user;
      const response = await userServices.searchUser(name! as string, +userId);
      res.json({
        status: true,
        message: "success",
        data: response,
      });
    } catch (error) {
      const err = error as unknown as Error;

      res.status(500).json({
        status: false,
        message: "Not Found",
      });
    }
  }
})();

// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await userServices.getUsers();

//     return res.status(200).json({ message: "success", data: users });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// };
