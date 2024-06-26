import toast from "react-hot-toast";
import { logoutUser } from "../redux/actions/userAction.js";

const setupInterceptor = (dispatch, navigate, axiosInstances) => {
  axiosInstances.forEach((instance) => {
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          if (error.config.url !== "/auth") {
            await dispatch(logoutUser(false));
            toast.error("User unauthorized. Please log in again.");

            navigate("/login", {
              state: {
                from: {
                  pathname: window.location.pathname,
                },
              },
            });
          }
        } else if (error.response.status === 403) {
          toast.error("You are not authorized to access this resource.");
          navigate("/");
        }
        return Promise.reject(error);
      },
    );
  });
};

export default setupInterceptor;
