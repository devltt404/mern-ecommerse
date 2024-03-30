import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ title, Icon, to, onClick }) => {
  const { pathname } = useLocation();
  const isSelected = pathname === to;
  return (
    <li>
      <Link
        className={`flex items-center font-semibold gap-4 ps-3 py-3  transition ${
          isSelected ? "bg-neutral-700" : "hover:bg-neutral-800"
        }`}
        to={to}
        onClick={onClick}
      >
        {Icon}
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
