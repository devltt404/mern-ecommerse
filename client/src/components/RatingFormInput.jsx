import { ErrorMessage, useField } from "formik";
import StarIcon from "./StarIcon.jsx";

const RatingFormInput = ({ name }) => {
  const [field, meta, helpers] = useField("rating");

  return (
    <div>
      <p className="font-medium text-gray-700">Rating</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <StarIcon
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
