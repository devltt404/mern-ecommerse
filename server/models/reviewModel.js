import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: [true, "Please enter review title"] },
    rating: { type: Number, required: [true, "Please enter your rating"] },
    content: { type: String, required: [true, "Please enter your content"] },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
