import { cloneElement } from "react";

const DropdownToggler = ({ children, toggleDropdown }) => {
  return <>{cloneElement(children, { onClick: toggleDropdown })}</>;
};

export default DropdownToggler;
