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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const register_1 = require("../lib/validations/register");
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = new (class authServices {
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = register_1.registerSchema.validate(payload);
            if (error) {
                throw new Error(error.details[0].message);
            }
            const isExists = yield db_1.default.user.findFirst({
                where: {
                    OR: [
                        {
                            username: value.username,
                        },
                        {
                            email: value.email,
                        },
                    ],
                },
            });
            if (isExists) {
                throw new Error("Username or email already exists");
            }
            const hashedPassword = yield bcrypt.hash(value.password, 10);
            value.password = hashedPassword;
            const user = yield db_1.default.user.create({
                data: Object.assign({}, value),
            });
            const profile = yield db_1.default.profile.create({
                data: {
                    userId: user.id,
                },
            });
            return { user, profile };
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.default.user.findFirst({
                where: {
                    OR: [
                        {
                            username,
                        },
                        {
                            email: username,
                        },
                    ],
                },
                include: {
                    profile: true,
                }
            });
            if (!user) {
                throw new Error("Invalid username or password");
            }
            const isMatch = yield bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid username or password");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: "1d",
            });
            return token;
        });
    }
    check(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.default.user.findFirst({
                where: {
                    id: id,
                },
                include: {
                    profile: true,
                }
            });
            if (!user) {
                throw new Error("Unauthorized");
            }
            const { password } = user, data = __rest(user, ["password"]);
            return data;
        });
    }
})();
