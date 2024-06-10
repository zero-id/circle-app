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
const authServices_1 = __importDefault(require("../services/authServices"));
exports.default = new (class AuthControllers {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield authServices_1.default.register(data);
                res.status(201).json({ message: "register success!", data: result });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const token = yield authServices_1.default.login(username, password);
                res.status(200).json({ message: "login success!", data: token });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    check(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield authServices_1.default.check(res.locals.user);
                res.status(200).json({ message: "success", data: user });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
})();
