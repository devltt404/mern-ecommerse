const MultipleToggleRadio = ({ name, values, setSelected, selected }) => {
  return (
    <div className="flex border border-gray-400">
      {values.map((value) => (
        <label key={value} htmlFor={value} className="h-full cursor-pointer">
          <input
            type="radio"
            name={name}
            id={value}
            className="sr-only peer"
            checked={selected === value}
            onChange={() => setSelected(value)}
          />
          <p className="px-4 py-[0.4rem] text-sm peer-checked:bg-black peer-checked:text-white transition h-full">
            {value}
          </p>
        </label>
      ))}
    </div>
  );
};

export default MultipleToggleRadio;
