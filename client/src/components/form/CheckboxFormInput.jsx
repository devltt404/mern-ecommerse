import { useController } from "react-hook-form";

const CheckboxFormInput = ({ children, name, control }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <>
      <label className="block cursor-pointer">
        <input
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
          checked={field.value}
          type="checkbox"
          className="me-2 h-[0.85rem] w-[0.85rem] cursor-pointer accent-black"
        />
        <span className="select-none">{children}</span>
      </label>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </>
  );
};

export default CheckboxFormInput;
