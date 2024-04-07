import { ErrorMessage, useField } from "formik";
import RatingStar from "../rating/RatingStar.jsx";

const RatingFormInput = ({ name }) => {
  const [field, , helpers] = useField("rating");

  return (
    <div>
      <p className="font-medium text-gray-700">Rating</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <RatingStar
            key={starIndex}
            starIndex={starIndex}
            rating={field.value}
            onClick={() => helpers.setValue(starIndex)}
            className="cursor-pointer"
            size={25}
          />
        ))}
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-500"
      />
    </div>
  );
};

export default RatingFormInput;
