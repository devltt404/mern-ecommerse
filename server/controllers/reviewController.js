import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";

export const addReview = async (req, res, next) => {
    try {
        const {title, rating, content, productId} = req.body;

        const product = await Product.findById(productId).populate("reviews");
        if (!product) {
            return res.status(404).json({message: "product not found"});
        }

        const alreadyReviewed = product.reviews.find(
            (review) => review.userId.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
            return res
                .status(400)
                .json({message: "user already reviewed this product."});
        }

        const review = await Review.create({
            userId: req.user._id,
            title,
            rating,
            content,
        });
        product.reviews.unshift(review);
        product.numOfReviews = product.reviews.length;
        product.rating = Number(
            (
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length
            ).toFixed(2)
        );
        await product.save();
        await review.populate("userId");
        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
};
