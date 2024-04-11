import { useState } from "react";
import { useController } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const PasswordFormInput = ({ label, placeholder, control, name }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          name={field.name}
          ref={field.ref}
          id={name}
          type={showPassword ? "text" : "password"}
          className={`w-full  border-[1.8px] py-2 pl-4 pr-12 outline-none transition ${
            error
              ? "border-red-500"
              : "focus:shadow-outer border-gray-300 shadow-black focus:border-black "
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
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default PasswordFormInput;
