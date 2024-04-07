import moment from "moment";
import { RatingRow } from "../../../../components/index.js";

const ReviewItem = ({ review }) => {
  return (
    <div className="py-6 [&:not(:last-child)]:border-b">
      <div className="mb-2 flex gap-4">
        <img
          className="h-12 w-12 rounded-full object-contain"
          src={review.userId?.avatar || "https://i.pravatar.cc/150"}
        />
        <div>
          <span className="mb-1 me-3 font-medium">
            {review.userId?.name || "Deleted user"}
          </span>
          <span className="text-gray-500">
            {moment(review.createdAt).fromNow()}
          </span>
          <br />
          <RatingRow rating={review.rating} />
        </div>
      </div>
      <p className="ms-2 text-lg font-medium">{review.title}</p>
      <p className="ms-2">{review.content}</p>
    </div>
  );
};

export default ReviewItem;
