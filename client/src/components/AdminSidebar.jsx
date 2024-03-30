import { useEffect, useRef } from "react";
import { BsCart2, BsTag } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";
import { PiPackageLight } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem.jsx";

const AdminSidebar = ({ showSidebar, setShowSidebar }) => {
  const ref = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <>
      {showSidebar && (
        <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
      )}
      <div
        ref={ref}
        className={`lg:fixed z-50 top-0 left-0 transition duration-300 ease-in-out ${
          !showSidebar
            ? "lg:-translate-x-full lg:opacity-0"
            : "lg:translate-x-0 lg:opacity-100"
        } z-50 h-screen bg-[#111111] w-72 text-white`}
      >
        <div className="py-6 mb-4 text-center">
          <Link to="/" className="text-2xl font-semibold">
            Admin
          </Link>
        </div>
        <nav>
          <ul className="flex flex-col gap-4 px-4">
            <SidebarItem
              onClick={() => setShowSidebar(false)}
              to="/admin/dashboard"
              title="Dashboard"
              Icon={<RxDashboard size={20} />}
            />
            <SidebarItem
              onClick={() => setShowSidebar(false)}
              to="/admin/users"
              title="Users"
              Icon={<LuUser2 size={20} />}
            />
            <SidebarItem
              onClick={() => setShowSidebar(false)}
              to="/admin/products"
              title="Products"
              Icon={<BsCart2 size={20} />}
            />
            <SidebarItem
              onClick={() => setShowSidebar(false)}
              to="/admin/categories"
              title="Categories"
              Icon={<BsTag size={20} />}
            />
            <SidebarItem
              onClick={() => setShowSidebar(false)}
              to="/admin/orders"
              title="Orders"
              Icon={<PiPackageLight size={20} />}
            />
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
