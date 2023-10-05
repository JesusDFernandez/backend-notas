import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(cors({ credentials: true, origin: FRONTEND_URL, }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());



export default app;