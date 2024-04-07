const Radio = ({ children, checked, onChange, value }) => {
  return (
    <label className="block">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="me-2 h-3 w-3 accent-black"
      />
      {children}
    </label>
  );
};

export default Radio;
