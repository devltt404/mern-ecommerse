import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./db/connectDB.js";
import errorHandler from "./middlewares/errorHandler.js";
import apiRouter from "./routes/index.js";
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1", apiRouter);
app.use(errorHandler);

await connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
