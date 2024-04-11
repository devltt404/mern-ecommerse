const MultipleToggleRadio = ({ name, values, setSelected, selected }) => {
  return (
    <div className="flex border border-gray-400">
      {values.map((value) => (
        <label
          key={value}
          htmlFor={value}
          className="h-full cursor-pointer transition hover:bg-gray-100"
        >
          <input
            type="radio"
            name={name}
            id={value}
            className="peer sr-only"
            checked={selected === value}
            onChange={() => setSelected(value)}
          />
          <p className="h-full px-4 py-[0.4rem] text-sm transition peer-checked:bg-black peer-checked:text-white">
            {value}
          </p>
        </label>
      ))}
    </div>
  );
};

export default MultipleToggleRadio;
