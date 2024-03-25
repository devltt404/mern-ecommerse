import { Children, cloneElement, useEffect, useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu.jsx";
import DropdownToggler from "./DropdownToggler.jsx";

const Dropdown = ({ children, className }) => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className={"relative " + className} ref={ref}>
      {Children.map(children, (child) => {
        if (child.type === DropdownToggler) {
          return cloneElement(child, { toggleDropdown });
        } else if (child.type === DropdownMenu) {
          return cloneElement(child, { isOpen, toggleDropdown });
        }
      })}
    </div>
  );
};

export default Dropdown;
