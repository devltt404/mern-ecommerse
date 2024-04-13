import { useGoogleLogin } from "@react-oauth/google";
import { IoLogoGoogle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/index.js";
import { authUser } from "../../../redux/actions/userAction.js";
import { userSelector } from "../../../redux/slices/userSlice.js";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const { userLoading } = useSelector(userSelector);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(
        authUser({
          endpoint: "/google",
          accessToken: tokenResponse.access_token,
        }),
      );
    },
  });

  return (
    <Button variant="outline" onClick={login} isLoading={userLoading}>
      <div className="flex items-center justify-center gap-2">
        <IoLogoGoogle size={18} />
        <span>Google</span>
      </div>
    </Button>
  );
};

export default GoogleLoginButton;
