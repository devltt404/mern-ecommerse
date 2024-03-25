import moment from "moment";
import RatingRow from "./RatingRow.jsx";

const ReviewItem = ({ review }) => {
  return (
    <div className="py-6 border-b">
      <div className="flex gap-4 mb-2">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={review.userId?.avatar || "https://i.pravatar.cc/150"}
        />
        <div>
          <span className="font-medium mb-1 me-3">
            {review.userId?.name || "Deleted User"}
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
