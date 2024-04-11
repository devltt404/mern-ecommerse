import { Controller } from "react-hook-form";
import Select from "react-select";
const SelectFormInput = ({
  name,
  options,
  control,
  label,
  defaultValue,
  error,
}) => {
  return (
    <div>
      {label && (
        <label className="mb-2 block font-medium text-gray-700">{label}</label>
      )}
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "#dddddd",
                primary50: "#c5c5c5",
                primary75: "#acacac",
                primary: "black",
              },
            })}
            ref={ref}
            options={options}
            value={options.find((v) => v.value === value)}
            onChange={(val) => {
              onChange(val.value);
            }}
          />
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default SelectFormInput;
