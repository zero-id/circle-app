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
const likeServices_1 = __importDefault(require("../services/likeServices"));
exports.default = new (class LikeControllers {
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threadId } = req.params;
                const likes = yield likeServices_1.default.find(+threadId);
                return res.status(200).json({ message: "success", data: likes });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threadId } = req.body;
                const userId = res.locals.user;
                const like = yield likeServices_1.default.like({ userId, threadId });
                return res.status(201).json({ message: "success", data: like });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    checkLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threadId } = req.params;
                const userId = res.locals.user;
                const like = yield likeServices_1.default.checkLike(+threadId, +userId);
                res.json({
                    status: true,
                    message: "success",
                    data: {
                        like,
                    },
                });
            }
            catch (error) {
                const err = error;
                res.status(500).json({
                    status: false,
                    message: err.message,
                });
            }
        });
    }
})();
