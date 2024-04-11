import RatingStar from "./RatingStar.jsx";

const RatingRow = ({ rating, size }) => {
  return (
    <div className="inline-flex gap-[1.5px]">
      <RatingStar starIndex={1} rating={rating} size={size} />
      <RatingStar starIndex={2} rating={rating} size={size} />
      <RatingStar starIndex={3} rating={rating} size={size} />
      <RatingStar starIndex={4} rating={rating} size={size} />
      <RatingStar starIndex={5} rating={rating} size={size} />
    </div>
  );
};

export default RatingRow;
