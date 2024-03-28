import express from "express";
import { getStats } from "../../controllers/adminController.js";
import { decodeToken, isAdmin } from "../../middlewares/authToken.js";

const adminRouter = express.Router();

adminRouter.get("/stats", decodeToken, isAdmin, getStats);

export default adminRouter;
