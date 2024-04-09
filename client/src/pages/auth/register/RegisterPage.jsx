import { Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  PasswordFormInput,
  TextFormInput,
} from "../../../components/index.js";
import { authUser } from "../../../redux/actions/userAction.js";
import {
  resetUserError,
  userSelector,
} from "../../../redux/slices/userSlice.js";
import GoogleLoginButton from "../components/GoogleLoginButton.jsx";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { userError } = useSelector(userSelector);

  const ref = useRef(null);

  useEffect(() => {
    dispatch(resetUserError());
  }, []);

  useEffect(() => {
    if (userError?.detail) {
      Object.keys(userError.detail).forEach((key) => {
        ref.current.setFieldError(key, userError.detail[key]);
      });
    }
  }, [userError]);

  return (
    <Formik
      innerRef={ref}
      initialValues={{
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Name is required";
        }
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Password is required";
        }
        if (!values.passwordConfirm) {
          errors.passwordConfirm = "Password confirmation is required";
        } else if (values.password !== values.passwordConfirm) {
          errors.passwordConfirm = "Passwords do not match";
        }
        return errors;
      }}
      onSubmit={(values) => {
        dispatch(authUser({ endpoint: "/register", ...values }));
      }}
    >
      {(formik) => (
        <Form className="mx-auto my-8 flex max-w-lg flex-col px-4">
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
              type="text"
              name="name"
              placeholder="Enter your name"
            />
            <TextFormInput
              label="Email"
              type="text"
              name="email"
              placeholder="Enter your email"
            />
            <PasswordFormInput
              label="Password"
              name="password"
              placeholder="Enter your password"
            />
            <PasswordFormInput
              label="Confirm Password"
              name="passwordConfirm"
              placeholder="Confirm your password"
            />
          </div>

          <Button
            type="submit"
            variant="fill"
            disabled={!formik.dirty || !formik.isValid}
          >
            Register
          </Button>

          <div className="my-3 flex items-center gap-6">
            <div className="flex-1 border"></div>
            <p className="text-center text-gray-500">Or continue with</p>
            <div className="flex-1 border"></div>
          </div>

          <GoogleLoginButton />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterPage;
