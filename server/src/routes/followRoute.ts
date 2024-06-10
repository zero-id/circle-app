import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import followControllers from "../controllers/followControllers";

export const followRoute = Router();

followRoute.post("/follows", authMiddleware, followControllers.follow);
followRoute.get(
  "/follows/followers",
  authMiddleware,
  followControllers.getFollowers
);
followRoute.get(
  "/follows/followings",
  authMiddleware,
  followControllers.getFollowings
);
followRoute.get(
  "/follows/suggestions",
  authMiddleware,
  followControllers.SuggetionFollow
);
