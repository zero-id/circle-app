"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path = __importStar(require("path"));
const upload = () => {
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./src/uploads");
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now();
            cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
        },
    });
    const uploadFile = (0, multer_1.default)({
        storage,
        limits: { fileSize: 1024 * 1024 * 2 },
    }).fields([
        { name: "image", maxCount: 4 },
        { name: "cover", maxCount: 1 },
        { name: "avatar", maxCount: 1 },
    ]);
    return (req, res, next) => {
        uploadFile(req, res, (err) => {
            if (err instanceof multer_1.default.MulterError) {
                // if (err.code === "LIMIT_UNEXPECTED_FILE") {
                //   return res.status(400).json({ error: "Max 4 images" });
                // }
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({ error: "Max file size is 2MB" });
                }
            }
            next();
        });
    };
};
exports.upload = upload;
