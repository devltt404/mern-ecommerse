import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userSelector } from "../redux/slices/userSlice.js";

const NoUserOnly = () => {
  const location = useLocation();
  const { user } = useSelector(userSelector);

  return user ? (
    <Navigate to={location?.state?.from?.pathname || "/"} replace={true} />
  ) : (
    <Outlet />
  );
};

export default NoUserOnly;
