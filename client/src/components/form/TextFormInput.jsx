import { ErrorMessage, Field, useField } from "formik";

const TextFormInput = ({
  label = "",
  type = "text",
  name,
  placeholder = "",
}) => {
  const [, meta] = useField(name);

  return (
    <div>
      {label !== "" && (
        <label htmlFor={name} className="font-medium text-gray-700">
          {label}
        </label>
      )}
      <Field
        name={name}
        type={type}
        as={type === "textarea" ? "textarea" : "input"}
        className={`mb-1 mt-2 w-full border-[1.8px] px-4 py-2 outline-none transition ${
          meta.touched && meta.error
            ? "border-red-500"
            : "border-gray-300 focus:border-black"
        } `}
        placeholder={placeholder}
        autoComplete="on"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-500"
      />
    </div>
  );
};

export default TextFormInput;
