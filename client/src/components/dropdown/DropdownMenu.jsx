const DropdownMenu = ({
  children,
  isOpen,
  position = "left",
  toggleDropdown,
  width = "auto",
}) => {
  const positionClasses = {
    left: "left-0",
    right: "right-0 text-right",
    center: "left-1/2 transform -translate-x-1/2",
  };

  const widthClasses = {
    full: "w-full",
    auto: "w-auto",
  };

  return (
    <ul
      onClick={(e) => {
        e.stopPropagation();
        toggleDropdown();
      }}
      className={`absolute flex-col bg-white border border-gray-300 shadow-md mt-1 overflow-hidden z-10 ${
        widthClasses[width]
      } ${positionClasses[position]} ${
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
