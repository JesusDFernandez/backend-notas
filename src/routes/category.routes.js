import { Router } from "express";
import { createCategory, updateCategory, deleteCategory, getCategories, getCategory } from "../controllers/category.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createCategorySchema } from "../schemas/category.schema.js";

const router = Router();

router.get("/categories", auth, getCategories);
router.post("/categories", auth, validateSchema(createCategorySchema), createCategory);
router.get("/categories/:id", auth, getCategory);
router.put("/categories/:id", auth, updateCategory);
router.delete("/categories/:id", auth, deleteCategory);

export default router;
