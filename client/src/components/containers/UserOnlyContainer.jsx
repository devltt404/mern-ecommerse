import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { userSelector } from "../../redux/slices/userSlice.js";

const UserOnlyContainer = () => {
  const { user } = useSelector(userSelector);

  useEffect(() => {
    if (!user) {
      toast.error("User unauthorized. Please log in.");
    }
  }, [user]);

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: { pathname: window.location.pathname } }}
      />
    );
  } else {
    return <Outlet />;
  }
};

export default UserOnlyContainer;
