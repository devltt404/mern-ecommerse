import { TbStarFilled } from "react-icons/tb";

const StarIcon = ({ starIndex, rating, size = 15, ...props }) => {
  return (
    <div {...props}>
      {starIndex > rating ? (
        0 <= starIndex - rating && starIndex - rating <= 0.5 ? (
          <div className="relative">
            <TbStarFilled size={size} className="text-black " />
            <TbStarFilled
              size={size}
              className="absolute top-0 text-gray-300"
              style={{ clipPath: "inset(0% 0% 0% 50%)" }}
            />
          </div>
        ) : (
          <TbStarFilled size={size} className="text-gray-300" />
        )
      ) : (
        <TbStarFilled size={size} className="text-black" />
      )}
    </div>
  );
};

export default StarIcon;
