import { ErrorMessage, Field, useField } from "formik";

const FormSelectInput = ({ label = "", name, children }) => {
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
        as="select"
        className={`mt-2 w-full border-[1.8px]  py-2 px-4 mb-1 transition outline-none ${
          meta.touched && meta.error
            ? "border-red-500"
            : "border-gray-300 focus:border-black"
        } `}
      >
        {children}
      </Field>
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
};

export default FormSelectInput;
