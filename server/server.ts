import express from "express";
import * as dotenv from "dotenv";
import db from "./src/db";
import router from "./src/routes";
import cors from "cors";
import path from "path";


dotenv.config();
const port = process.env.PORT || 3000;

const corsConfig: object = {
  origin: "http://localhost:5173",
};


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("./src/uploads"));
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

app.use(cors(corsConfig));
app.use("/api/v1", router);

app.listen(port, async () => {
  await db.$connect();
  console.log(`Example app listening at http://localhost:${port}`);
});
