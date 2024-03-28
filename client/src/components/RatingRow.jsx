import StarIcon from "./StarIcon.jsx";

const RatingRow = ({ rating, size }) => {
  return (
    <div className="inline-flex gap-[1px]">
      <StarIcon starIndex={1} rating={rating} size={size} />
      <StarIcon starIndex={2} rating={rating} size={size} />
      <StarIcon starIndex={3} rating={rating} size={size} />
      <StarIcon starIndex={4} rating={rating} size={size} />
      <StarIcon starIndex={5} rating={rating} size={size} />
    </div>
  );
};

export default RatingRow;
