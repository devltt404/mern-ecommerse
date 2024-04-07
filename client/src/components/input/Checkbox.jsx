const Checkbox = ({ children, checked, onChange, value }) => {
  return (
    <label className="block cursor-pointer">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className="me-2 h-[0.85rem] w-[0.85rem] cursor-pointer accent-black"
      />
      {children}
    </label>
  );
};

export default Checkbox;
