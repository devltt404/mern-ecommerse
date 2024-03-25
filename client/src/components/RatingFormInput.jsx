import { ErrorMessage, useField } from "formik";
import StarIcon from "./StarIcon.jsx";

const RatingFormInput = ({ name }) => {
  const [field, meta, helpers] = useField("rating");

  return (
    <div>
      <p className="text-gray-700 font-medium">Rating</p>
      <div className="flex">
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
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
};

export default RatingFormInput;
