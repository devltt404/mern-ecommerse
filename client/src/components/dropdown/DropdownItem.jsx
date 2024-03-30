const DropdownItem = ({
  children,
  onClick,
  className = "",
  position = "right",
}) => {
  const positionClasses = {
    right: "ps-12 pe-3",
    left: "ps-3 pe-10",
    center: "ps-3 pe-10",
  };

  return (
    <li
      className={`transition hover:bg-gray-50 cursor-pointer py-[0.8rem] ${positionClasses[position]} ${className}`}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default DropdownItem;
