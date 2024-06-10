import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { upload } from "../middleware/uploadFile";
import userControllers from "../controllers/userControllers";
const userRoute = Router();

userRoute.get("/users", userControllers.findAll);
userRoute.get("/users-detail", authMiddleware, userControllers.findById);
userRoute.get("/users/profile", authMiddleware, userControllers.findProfile);
userRoute.get("/users/search", authMiddleware, userControllers.searchUser);

userRoute.patch("/users", authMiddleware, userControllers.update);
userRoute.patch(
  "/users/profile",
  authMiddleware,
  upload(),
  userControllers.updateProfile
);

export default userRoute;
