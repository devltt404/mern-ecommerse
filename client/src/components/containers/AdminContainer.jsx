import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getAdmin } from "../../redux/actions/userAction.js";
import { AdminHeader, AdminSidebar, SpinnerLoading } from "../index.js";

const AdminContainer = () => {
  const dispatch = useDispatch();

  const [initialLoading, setInitialLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  const initialLoad = async () => {
    await dispatch(getAdmin());
    setInitialLoading(false);
  };

  useEffect(() => {
    initialLoad();
  }, []);

  return initialLoading ? (
    <SpinnerLoading />
  ) : (
    <div className="flex h-screen bg-[#f6f6f6]">
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className="h-screen flex-1 overflow-y-scroll">
        <AdminHeader setShowSidebar={setShowSidebar} />
        <div className="px-10 py-10 md:px-5 md:py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminContainer;
