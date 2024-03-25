import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ title, Icon, to }) => {
  const { pathname } = useLocation();
  const isSelected = pathname === to;
  return (
    <Link to={to}>
      <li
        className={`flex items-center font-semibold gap-4 ps-3 py-3 rounded-md transition ${
          isSelected ? "bg-neutral-700" : "hover:bg-neutral-800"
        }`}
      >
        {Icon}
        <span>{title}</span>
      </li>
    </Link>
  );
};

export default SidebarItem;
