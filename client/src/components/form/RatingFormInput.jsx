import { useController } from "react-hook-form";
import RatingStar from "../rating/RatingStar.jsx";

const RatingFormInput = ({ name, control }) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div>
      <p className="font-medium text-gray-700">Rating</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <RatingStar
            key={starIndex}
            starIndex={starIndex}
            rating={value}
            onClick={() => onChange(starIndex)}
            className="cursor-pointer"
            size={25}
          />
        ))}
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default RatingFormInput;
