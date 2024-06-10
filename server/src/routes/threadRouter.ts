import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { upload } from "../middleware/uploadFile";
import cloudinary from "../lib/cloudinary";
import threadControllers from "../controllers/threadControllers";
const threadRoute = Router();

cloudinary.config();

threadRoute.post(
  "/threads",
  authMiddleware,
  upload(),
  threadControllers.create
);

threadRoute.get("/threads", threadControllers.findAll);
threadRoute.get("/threads/replies/:id", threadControllers.findReplies);
threadRoute.get("/threads/:id", threadControllers.findById);

export default threadRoute;
