import { useController } from "react-hook-form";

const RadioFormInput = ({
  children,
  control,
  name,
  value,
  showError = false,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <>
      <label className="flex cursor-pointer items-center gap-2 font-medium text-gray-700">
        <input
          onChange={field.onChange}
          onBlur={field.onBlur}
          ref={field.ref}
          value={value}
          name={name}
          checked={field.value == value}
          type="radio"
          className="peer sr-only"
        />
        <span className="shadow-inner shadow-white inline-block h-[14px] w-[14px] border border-gray-300 peer-checked:border-black peer-checked:bg-black"></span>
        {children}
      </label>
      {error && showError && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </>
  );
};

export default RadioFormInput;
