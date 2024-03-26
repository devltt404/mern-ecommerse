import { Form, Formik } from "formik";
import { IoLogoGoogle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import FormInput from "../components/FormInput.jsx";
import FormPasswordInput from "../components/FormPasswordInput.jsx";
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
        <Form className="w-[500px] mx-auto my-8 flex flex-col">
          <h1 className="text-center text-3xl mb-4 font-semibold">
            Welcome back!
          </h1>
          <div>
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-black hover:underline transition"
              >
                Register
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-4">
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
            <div>
              <p className="text-right text-gray-600">Forgot your password?</p>
            </div>
            <Button
              type="submit"
              variant="fill"
              disabled={!formik.dirty || !formik.isValid}
            >
              Login
            </Button>
            <div className="flex items-center gap-6">
              <div className="border flex-1"></div>
              <p className="text-center text-gray-500">Or continue with</p>
              <div className="border flex-1"></div>
            </div>
            <Button variant="outline">
              <div className="flex items-center justify-center gap-2">
                <IoLogoGoogle size={20} />
                <span>Google</span>
              </div>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
