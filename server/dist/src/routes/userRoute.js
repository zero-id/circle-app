"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const uploadFile_1 = require("../middleware/uploadFile");
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const userRoute = (0, express_1.Router)();
userRoute.get("/users", userControllers_1.default.findAll);
userRoute.get("/users-detail", auth_1.authMiddleware, userControllers_1.default.findById);
userRoute.get("/users/profile", auth_1.authMiddleware, userControllers_1.default.findProfile);
userRoute.get("/users/search", auth_1.authMiddleware, userControllers_1.default.searchUser);
userRoute.patch("/users", auth_1.authMiddleware, userControllers_1.default.update);
userRoute.patch("/users/profile", auth_1.authMiddleware, (0, uploadFile_1.upload)(), userControllers_1.default.updateProfile);
exports.default = userRoute;
