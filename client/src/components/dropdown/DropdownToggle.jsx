import { cloneElement } from "react";

const DropdownToggle = ({ children, toggleDropdown }) => {
  return <>{cloneElement(children, { onClick: toggleDropdown })}</>;
};

export default DropdownToggle;
