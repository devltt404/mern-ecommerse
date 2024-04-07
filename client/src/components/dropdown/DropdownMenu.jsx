import { Children, cloneElement } from "react";

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
      className={`absolute z-10 mt-1 min-w-max flex-col overflow-hidden border border-gray-300 bg-white shadow-md ${
        widthClasses[width]
      } ${positionClasses[position]} ${
        isOpen
          ? "translate-y-0 opacity-100"
          : "invisible -translate-y-3 opacity-0"
      } transition-all duration-200`}
    >
      {Children.map(children, (child) => {
        return cloneElement(child, { position });
      })}
    </ul>
  );
};

export default DropdownMenu;
