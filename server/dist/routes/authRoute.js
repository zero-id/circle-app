"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const authContollers_1 = __importDefault(require("../controllers/authContollers"));
const authRoute = (0, express_1.Router)();
authRoute.post("/auth/register", authContollers_1.default.register);
authRoute.post("/auth/login", authContollers_1.default.login);
authRoute.get("/auth/check", auth_1.authMiddleware, authContollers_1.default.check);
exports.default = authRoute;
