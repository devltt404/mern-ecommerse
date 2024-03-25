const DropdownItem = ({ children, onClick, className }) => {
  return (
    <li
      className={
        "transition hover:bg-gray-50 cursor-pointer " +
        className
      }
      onClick={onClick}
    >
      <div className="py-2 px-3 ">{children}</div>
    </li>
  );
};

export default DropdownItem;
