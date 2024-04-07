import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Button } from "../../../../components/index.js";
import { productSelector } from "../../../../redux/slices/productSlice.js";
import { userSelector } from "../../../../redux/slices/userSlice.js";
import AddReview from "./AddReview.jsx";
import ReviewItem from "./ReviewItem.jsx";

const ReviewArea = () => {
  const [showAddReview, setShowAddReview] = useState(false);
  const { user } = useSelector(userSelector);
  const { product } = useSelector(productSelector);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">
        Reviews <span className="font-medium">({product.reviews.length})</span>
      </h2>

      {user && (
        <div className="mb-4">
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
            className={`mb-2 overflow-hidden transition-all duration-500 ${
              showAddReview ? "opacity-1 max-h-[1000px]" : "max-h-0 opacity-0"
            }`}
          >
            <AddReview />
          </div>
        </div>
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
