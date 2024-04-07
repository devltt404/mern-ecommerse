import { ErrorMessage, Field, useField } from "formik";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const FormPasswordInput = ({ label, name, placeholder }) => {
  const [, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor={name} className="font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Field
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          className={`mb-1 mt-2 w-full  border-[1.8px] py-2 pl-4 pr-12 outline-none transition ${
            meta.touched && meta.error
              ? "border-red-500"
              : "border-gray-300 focus:border-black"
          } `}
          placeholder={placeholder}
          autoComplete="on"
        />
        <div
          className="absolute right-4 top-1/2 mt-[2px] -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <IoEyeOutline size={18} />
          ) : (
            <IoEyeOffOutline size={18} />
          )}
        </div>
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-500"
      />
    </div>
  );
};

export default FormPasswordInput;
