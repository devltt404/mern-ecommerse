const Radio = ({ children, checked, onChange, value }) => {
  return (
    <label className="block">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-3 h-3 accent-black me-2"
      />
      {children}
    </label>
  );
};

export default Radio;
