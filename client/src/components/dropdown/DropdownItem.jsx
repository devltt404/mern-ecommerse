const DropdownItem = ({ children, onClick, className = "" }) => {
  return (
    <li
      className={
        "transition hover:bg-gray-50 cursor-pointer py-[0.6rem] ps-8 pe-3  " +
        className
      }
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default DropdownItem;
