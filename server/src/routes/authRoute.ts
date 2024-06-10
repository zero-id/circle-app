import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import authContollers from "../controllers/authContollers";
const authRoute = Router();

authRoute.post("/auth/register", authContollers.register);
authRoute.post("/auth/login", authContollers.login);
authRoute.get("/auth/check", authMiddleware, authContollers.check);

export default authRoute;
