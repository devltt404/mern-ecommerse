import { useState } from "react";

const IconOutlineButton = ({
  Icon,
  size = 22,
  HoverIcon,
  onClick = () => {},
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Icon size={size} className="" />
      <HoverIcon
        size={size}
        className={`absolute top-0 transition ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
      {children}
    </button>
  );
};

export default IconOutlineButton;
