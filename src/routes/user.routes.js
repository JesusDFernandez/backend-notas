import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { deleteUser, getUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/users/", auth, getUser);
router.put("/users/", auth, updateUser);
router.delete("/users/", auth, deleteUser);

export default router;
