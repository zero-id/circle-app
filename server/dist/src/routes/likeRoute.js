"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRoute = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const likeControllers_1 = __importDefault(require("../controllers/likeControllers"));
exports.likeRoute = (0, express_1.Router)();
cloudinary_1.default.config();
exports.likeRoute.post("/likes", auth_1.authMiddleware, likeControllers_1.default.create);
exports.likeRoute.get("/likes/:threadId", auth_1.authMiddleware, likeControllers_1.default.find);
exports.likeRoute.get("/check-likes/:threadId", auth_1.authMiddleware, likeControllers_1.default.checkLike);
