import { useGoogleLogin } from "@react-oauth/google";
import { IoLogoGoogle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { authUser } from "../redux/actions/userAction.js";
import Button from "./Button.jsx";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(
        authUser({
          endpoint: "/google",
          accessToken: tokenResponse.access_token,
        })
      );
    },
  });

  return (
    <Button variant="outline" onClick={login}>
      <div className="flex items-center justify-center gap-2">
        <IoLogoGoogle size={18} />
        <span>Google</span>
      </div>
    </Button>
  );
};

export default GoogleLoginButton;
