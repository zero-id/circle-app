"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const uploadFile_1 = require("../middleware/uploadFile");
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const threadControllers_1 = __importDefault(require("../controllers/threadControllers"));
const threadRoute = (0, express_1.Router)();
cloudinary_1.default.config();
threadRoute.post("/threads", auth_1.authMiddleware, (0, uploadFile_1.upload)(), threadControllers_1.default.create);
threadRoute.get("/threads", threadControllers_1.default.findAll);
threadRoute.get("/threads/replies/:id", threadControllers_1.default.findReplies);
threadRoute.get("/threads/:id", threadControllers_1.default.findById);
exports.default = threadRoute;
