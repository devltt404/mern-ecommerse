import { ErrorMessage, Field, useField } from "formik";

const FormSelectInput = ({ label = "", name, children }) => {
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
        as="select"
        className={`mb-1 mt-2 w-full  border-[1.8px] px-4 py-2 outline-none transition ${
          meta.touched && meta.error
            ? "border-red-500"
            : "border-gray-300 focus:border-black"
        } `}
      >
        {children}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-500"
      />
    </div>
  );
};

export default FormSelectInput;
