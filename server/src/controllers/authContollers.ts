import { Request, Response } from "express";
import { IRegister } from "../types/app";
import authServices from "../services/authServices";

export default new (class AuthControllers {
  async register(req: Request, res: Response) {
    try {
      const data: IRegister = req.body;

      const result = await authServices.register(data);

      res.status(201).json({ message: "register success!", data: result });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await authServices.login(username, password);

      res.status(200).json({ message: "login success!", data: token });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async check(req: Request, res: Response) {
    try {
      const user = await authServices.check(res.locals.user);
      res.status(200).json({ message: "success", data: user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
})();
