import { Router } from "express";
// import profileRoute from "./ProfileRoute";
import cloudinary from "../lib/cloudinary";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import threadRoute from "./threadRouter";
import { likeRoute } from "./likeRoute";
import { followRoute } from "./followRoute";


const router = Router();

cloudinary.config();

router.use(authRoute);
router.use(userRoute);
router.use(threadRoute);
router.use(likeRoute);
router.use(followRoute);

export default router;
