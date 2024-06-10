import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import cloudinary from "../lib/cloudinary";
import likeControllers from "../controllers/likeControllers";
export const likeRoute = Router();

cloudinary.config();

likeRoute.post("/likes", authMiddleware, likeControllers.create);
likeRoute.get("/likes/:threadId", authMiddleware, likeControllers.find);
likeRoute.get(
  "/check-likes/:threadId",
  authMiddleware,
  likeControllers.checkLike
);
