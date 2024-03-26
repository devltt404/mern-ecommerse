import { TbStarFilled } from "react-icons/tb";

const StarIcon = ({ starIndex, rating, size = 15, ...props }) => {
  return (
    <div {...props}>
      {starIndex > rating ? (
        0 <= starIndex - rating && starIndex - rating <= 0.5 ? (
          <div className="relative">
            <TbStarFilled size={size} className=" text-yellow-400" />
            <TbStarFilled
              size={size}
              className="text-gray-300 absolute top-0"
              style={{ clipPath: "inset(0% 0% 0% 50%)" }}
            />
          </div>
        ) : (
          <TbStarFilled size={size} className="text-gray-300" />
        )
      ) : (
        <TbStarFilled size={size} className="text-yellow-400" />
      )}
    </div>
  );
};

export default StarIcon;
