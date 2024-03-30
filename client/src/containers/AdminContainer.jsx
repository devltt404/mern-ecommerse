import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import Loading from "../components/Loading.jsx";
import AdminHeader from "../pages/admin/AdminHeader.jsx";
import { getAdmin } from "../redux/actions/userAction.js";

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
    <Loading />
  ) : (
    <div className="flex h-screen bg-[#f6f6f6]">
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className="flex-1 h-screen overflow-y-scroll">
        <AdminHeader setShowSidebar={setShowSidebar} />
        <div className="px-10 py-10 md:px-5 md:py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminContainer;
