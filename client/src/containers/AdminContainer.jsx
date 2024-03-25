import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import Loading from "../components/Loading.jsx";
import AdminHeader from "../pages/admin/AdminHeader.jsx";
import { getAdmin } from "../redux/actions/userAction.js";
import { userSelector } from "../redux/slices/userSlice.js";

const AdminContainer = () => {
  const dispatch = useDispatch();
  const { userLoading, user } = useSelector(userSelector);

  const [initialLoading, setInitialLoading] = useState(true);

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
      <AdminSidebar />
      <div className="flex-1 h-screen overflow-y-scroll">
        <AdminHeader />
        <div className="p-6 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminContainer;