"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const userServices_1 = __importDefault(require("../services/userServices"));
exports.default = new (class UserController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userServices_1.default.findAll();
                return res.status(200).json({ message: "success", data: users });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = res.locals.user;
                const user = yield userServices_1.default.findById(+id);
                return res.status(200).json({ message: "success", data: user });
            }
            catch (error) { }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = res.locals.user;
                const data = req.body;
                const user = yield userServices_1.default.update(+id, data);
                return res.status(200).json({ message: "success", data: user });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    findProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = res.locals.user;
                const profile = yield userServices_1.default.findProfile(+userId);
                return res.status(200).json({ message: "success", data: profile });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = res.locals.user;
                const data = req.body;
                const files = req === null || req === void 0 ? void 0 : req.files;
                if (files.cover) {
                    const cloudinaryResponse = yield cloudinary_1.v2.uploader.upload("./src/uploads/" + files.cover[0].filename);
                    data.cover = cloudinaryResponse.secure_url;
                }
                if (files.avatar) {
                    const cloudinaryResponse = yield cloudinary_1.v2.uploader.upload("./src/uploads/" + files.avatar[0].filename);
                    data.avatar = cloudinaryResponse.secure_url;
                }
                yield userServices_1.default.updateProfile(userId, data);
                return res.status(200).json({ message: "Profile updated successfully" });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    searchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.query;
                const userId = res.locals.user;
                const response = yield userServices_1.default.searchUser(name, +userId);
                res.json({
                    status: true,
                    message: "success",
                    data: response,
                });
            }
            catch (error) {
                const err = error;
                res.status(500).json({
                    status: false,
                    message: "Not Found",
                });
            }
        });
    }
})();
// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await userServices.getUsers();
//     return res.status(200).json({ message: "success", data: users });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// };
