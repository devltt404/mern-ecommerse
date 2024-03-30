import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import FormInput from "../components/FormInput.jsx";
import FormPasswordInput from "../components/FormPasswordInput.jsx";
import GoogleLoginButton from "../components/GoogleLoginButton.jsx";
import { authUser } from "../redux/actions/userAction.js";

const LoginPage = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};
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
        return errors;
      }}
      onSubmit={(values) => {
        dispatch(authUser({ endpoint: "/login", ...values }));
      }}
    >
      {(formik) => (
        <Form className="flex flex-col max-w-lg px-4 mx-auto my-8 ">
          <h1 className="mb-3 text-3xl font-semibold text-center">
            Welcome back!
          </h1>
          <div>
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-black transition hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-4 mb-1">
            <FormInput
              label="Email"
              type="text"
              name="email"
              placeholder="Enter your email"
            />
            <FormPasswordInput
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <p className="text-right text-gray-600">Forgot your password?</p>
          </div>

          <Button
            type="submit"
            variant="fill"
            disabled={!formik.dirty || !formik.isValid}
          >
            Login
          </Button>

          <div className="flex items-center gap-6 my-3">
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

export default LoginPage;
