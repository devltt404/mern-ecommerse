const Checkbox = ({ children, checked, onChange, value }) => {
  return (
    <label className="block cursor-pointer">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className="accent-black w-[0.85rem] h-[0.85rem] me-2 cursor-pointer"
      />
      {children}
    </label>
  );
};

export default Checkbox;
