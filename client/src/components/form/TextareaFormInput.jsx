import { useController } from "react-hook-form";

const TextareaFormInput = ({ label, placeholder, control, name }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div>
      {label && (
        <label htmlFor={name} className="mb-2 block font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        ref={field.ref}
        id={name}
        className={`h-20 w-full border px-4 py-2 outline-none transition ${
          error
            ? "border-red-500"
            : "focus:shadow-outer border-gray-300 shadow-black focus:border-black"
        } `}
        placeholder={placeholder}
        autoComplete="on"
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default TextareaFormInput;
