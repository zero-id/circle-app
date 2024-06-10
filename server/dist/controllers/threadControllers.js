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
const threadServices_1 = __importDefault(require("../services/threadServices"));
exports.default = new (class ThreadControllers {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const threads = yield threadServices_1.default.findAll();
                return res.status(200).json({ message: "success", data: threads });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const thread = yield threadServices_1.default.findById(+id);
                return res.status(200).json({ message: "success", data: thread });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                body.userId = res.locals.user;
                const thread = yield threadServices_1.default.create(body, req.files);
                return res.status(201).json({ message: "success", data: thread });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: error.message });
            }
        });
    }
    findReplies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const replies = yield threadServices_1.default.findReplies(+id);
                return res.status(200).json({ message: "success", data: replies });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
})();
// export const getThreads = async (req: Request, res: Response) => {
//   try {
//     const threads = await threadServices.getThreads();
//     return res.status(200).json({ message: "success", data: threads });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// };
// export const getThread = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const thread = await threadServices.getThread(+id);
//     return res.status(200).json({ message: "success", data: thread });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// };
// export const createThread = async (req: Request, res: Response) => {
// try {
//   const { body } = req;
//   body.userId = res.locals.user;
//   const thread = await threadServices.createThread(
//     body,
//     req.files as { [fieldname: string]: Express.Multer.File[] }
//   );
//   return res.status(201).json({ message: "success", data: thread });
// } catch (error: any) {
//   console.log(error);
//   return res.status(500).json({ error: error.message });
// }
// };
// export const getReplies = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const replies = await threadServices.getReplies(+id);
//     return res.status(200).json({ message: "success", data: replies });
//   } catch (error) {
//     return res.status(500).json({ error: error });
//   }
// };
