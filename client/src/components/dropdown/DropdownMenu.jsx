const DropdownMenu = ({
  children,
  isOpen,
  position = "left",
  toggleDropdown,
}) => {
  const positionClasses = {
    left: "left-0",
    right: "right-0 text-right",
    center: "left-1/2 transform -translate-x-1/2",
  };

  return (
    <ul
      onClick={(e) => {
        e.stopPropagation();
        toggleDropdown();
      }}
      className={`absolute flex-col bg-white border border-gray-300 rounded-lg w-[120px] shadow-md mt-1 overflow-hidden z-10 ${
        positionClasses[position]
      } ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "invisible opacity-0 -translate-y-3"
      } transition-all duration-200`}
    >
      {children}
    </ul>
  );
};

export default DropdownMenu;
