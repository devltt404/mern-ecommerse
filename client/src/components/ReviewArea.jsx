import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useSelector } from "react-redux";
import { productSelector } from "../redux/slices/productSlice.js";
import { userSelector } from "../redux/slices/userSlice.js";
import AddReview from "./AddReview.jsx";
import Button from "./Button.jsx";
import ReviewItem from "./ReviewItem.jsx";

const ReviewArea = () => {
  const [showAddReview, setShowAddReview] = useState(false);
  const { user } = useSelector(userSelector);
  const { product } = useSelector(productSelector);

  return (
    <div>
      <h2 className="text-2xl font-medium mb-2">
        Reviews ({product.reviews.length})
      </h2>

      {user && (
        <>
          <Button
            size="sm"
            variant="fill"
            onClick={() => {
              setShowAddReview(!showAddReview);
            }}
          >
            <div className="flex items-center">
              <LuPlus className="me-2" />
              <span>Write a Review </span>
            </div>
          </Button>

          <div
            className={`transition-all ease-in-out duration-500 overflow-hidden mb-2 ${
              showAddReview ? "max-h-[1000px]" : "max-h-0 "
            }`}
          >
            <AddReview />
          </div>
        </>
      )}

      {product.reviews.length > 0 ? (
        <div className="flex flex-col">
          {product.reviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-lg">This product hasn't been reviewed yet.</p>
      )}
    </div>
  );
};

export default ReviewArea;