import { NextFunction } from "express";
import multer from "multer";
import * as path from "path";

export const upload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./src/uploads");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });

  const uploadFile = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 2 },
  }).fields([
    { name: "image", maxCount: 4 },
    { name: "cover", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]);

  return (req: any, res: any, next: NextFunction) => {
    uploadFile(req, res, (err: any) => {

      if (err instanceof multer.MulterError) {
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
