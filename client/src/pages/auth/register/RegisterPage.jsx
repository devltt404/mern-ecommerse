import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import PasswordFormInput from "../../../components/form/PasswordFormInput.jsx";
import TextFormInput from "../../../components/form/TextFormInput.jsx";
import { Button } from "../../../components/index.js";
import { authUser } from "../../../redux/actions/userAction.js";
import {
  resetUserError,
  userSelector,
} from "../../../redux/slices/userSlice.js";
import GoogleLoginButton from "../components/GoogleLoginButton.jsx";

const RegisterPage = () => {
  const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
    passwordConfirm: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const { handleSubmit, setError, control, clearErrors } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(authUser({ endpoint: "/register", ...data }));
  };

  const dispatch = useDispatch();
  const { userError } = useSelector(userSelector);

  useEffect(() => {
    dispatch(resetUserError());
  }, []);

  useEffect(() => {
    if (userError?.detail) {
      Object.keys(userError.detail).forEach((key, i) => {
        setError(
          key,
          { message: userError.detail[key] },
          { shouldFocus: i === 0 },
        );
      });
    } else {
      clearErrors();
    }
  }, [userError]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto my-8 flex max-w-lg flex-col px-4"
    >
      <h1 className="mb-3 text-center text-3xl font-semibold">Welcome!</h1>
      <div>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-black transition hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4">
        <TextFormInput
          label="Name"
          control={control}
          name="name"
          placeholder="Enter your name"
        />
        <TextFormInput
          label="Email"
          control={control}
          name="email"
          placeholder="Enter your email"
        />
        <PasswordFormInput
          label="Password"
          control={control}
          name="password"
          placeholder="Enter your password"
        />
        <PasswordFormInput
          label="Confirm Password"
          control={control}
          name="passwordConfirm"
          placeholder="Confirm your password"
        />
      </div>

      <Button type="submit" variant="fill">
        Register
      </Button>

      <div className="my-3 flex items-center gap-6">
        <div className="flex-1 border"></div>
        <p className="text-center text-gray-500">Or continue with</p>
        <div className="flex-1 border"></div>
      </div>

      <GoogleLoginButton />
    </form>
  );
};

export default RegisterPage;
