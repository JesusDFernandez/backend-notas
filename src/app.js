import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taksRoutes from "./routes/tasks.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoriesRoutes from "./routes/category.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(cors({ credentials: true, origin: FRONTEND_URL }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", taksRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", userRoutes);

export default app;