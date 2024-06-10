"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRoute = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const followControllers_1 = __importDefault(require("../controllers/followControllers"));
exports.followRoute = (0, express_1.Router)();
exports.followRoute.post("/follows", auth_1.authMiddleware, followControllers_1.default.follow);
exports.followRoute.get("/follows/followers", auth_1.authMiddleware, followControllers_1.default.getFollowers);
exports.followRoute.get("/follows/followings", auth_1.authMiddleware, followControllers_1.default.getFollowings);
exports.followRoute.get("/follows/suggestions", auth_1.authMiddleware, followControllers_1.default.SuggetionFollow);
