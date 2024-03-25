import { ErrorMessage, Field, useField } from "formik";

const FormInput = ({ label = "", type = "text", name, placeholder = "" }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      {label != "" && (
        <label htmlFor={name} className="text-gray-700 font-medium">
          {label}
        </label>
      )}
      <Field
        name={name}
        type={type}
        as={type === "textarea" ? "textarea" : "input"}
        className={`mt-2 w-full border-[1.8px] rounded-lg py-2 px-4 mb-1 transition outline-none ${
          meta.touched && meta.error
            ? "border-red-500"
            : "border-gray-300 focus:border-black"
        } `}
        placeholder={placeholder}
        autoComplete="on"
      />
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
};

export default FormInput;
