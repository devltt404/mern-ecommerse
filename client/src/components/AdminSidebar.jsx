import { BsCart2, BsTag } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";
import { PiPackageLight } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem.jsx";

const AdminSidebar = () => {
  return (
    <div className="h-screen bg-[#111111] w-72 text-white">
      <div className="py-6 mb-4 text-center">
        <Link to="/" className="text-2xl font-semibold">
          Admin
        </Link>
      </div>

      <nav>
        <ul className="flex flex-col px-5 gap-4">
          <SidebarItem
            to="/admin/dashboard"
            title="Dashboard"
            Icon={<RxDashboard size={20} />}
          />
          <SidebarItem
            to="/admin/users"
            title="Users"
            Icon={<LuUser2 size={20} />}
          />
          <SidebarItem
            to="/admin/products"
            title="Products"
            Icon={<BsCart2 size={20} />}
          />
          <SidebarItem
            to="/admin/categories"
            title="Categories"
            Icon={<BsTag size={20} />}
          />
          <SidebarItem
            to="/admin/orders"
            title="Orders"
            Icon={<PiPackageLight size={20} />}
          />
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
