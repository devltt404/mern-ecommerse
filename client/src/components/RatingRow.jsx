import StarIcon from "./StarIcon.jsx";

const RatingRow = ({ rating }) => {
  return (
    <div className="inline-flex">
      <StarIcon starIndex={1} rating={rating} />
      <StarIcon starIndex={2} rating={rating} />
      <StarIcon starIndex={3} rating={rating} />
      <StarIcon starIndex={4} rating={rating} />
      <StarIcon starIndex={5} rating={rating} />
    </div>
  );
};

export default RatingRow;
