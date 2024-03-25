import express from "express";
import { addReview } from "../../controllers/reviewController.js";
import { decodeToken, isUser } from "../../middlewares/authToken.js";

const reviewRouter = express.Router();

reviewRouter.post("/", decodeToken, isUser, addReview);

export default reviewRouter;
