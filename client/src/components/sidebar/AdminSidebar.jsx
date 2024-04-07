import { useEffect, useRef } from "react";
import { BsCart2, BsTag } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";
import { PiPackageLight } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";

const AdminSidebarItem = ({ title, Icon, to, onClick }) => {
  const { pathname } = useLocation();
  const isSelected = pathname === to;
  return (
    <li>
      <Link
        className={`flex items-center gap-4 py-3 ps-3 font-medium  transition ${
          isSelected ? "bg-neutral-700 font-semibold" : "hover:bg-neutral-800"
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
        className={`left-0 top-0 z-50 transition duration-300 ease-in-out lg:fixed ${
          !showSidebar
            ? "lg:-translate-x-full lg:opacity-0"
            : "lg:translate-x-0 lg:opacity-100"
        } z-50 h-screen w-72 bg-[#111111] text-white`}
      >
        <div className="mb-4 py-6 text-center">
          <Link to="/" className="text-2xl font-semibold">
            Admin
          </Link>
        </div>
        <nav>
          <ul className="flex flex-col gap-4 px-4">
            <AdminSidebarItem
              onClick={() => setShowSidebar(false)}
              to="/admin/dashboard"
              title="Dashboard"
              Icon={<RxDashboard size={20} />}
            />
            <AdminSidebarItem
              onClick={() => setShowSidebar(false)}
              to="/admin/users"
              title="Users"
              Icon={<LuUser2 size={20} />}
            />
            <AdminSidebarItem
              onClick={() => setShowSidebar(false)}
              to="/admin/products"
              title="Products"
              Icon={<BsCart2 size={20} />}
            />
            <AdminSidebarItem
              onClick={() => setShowSidebar(false)}
              to="/admin/categories"
              title="Categories"
              Icon={<BsTag size={20} />}
            />
            <AdminSidebarItem
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
