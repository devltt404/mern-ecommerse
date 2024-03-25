import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../controllers/categoryController.js";
import { decodeToken, isAdmin } from "../../middlewares/authToken.js";
const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);

categoryRouter.post("/", decodeToken, isAdmin, addCategory);
categoryRouter.delete("/:id", decodeToken, isAdmin, deleteCategory);
categoryRouter.put("/:id", decodeToken, isAdmin, updateCategory);

export default categoryRouter;
