import { Form, Formik } from "formik";
import { IoLogoGoogle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import FormInput from "../components/FormInput.jsx";
import FormPasswordInput from "../components/FormPasswordInput.jsx";
import { authUser } from "../redux/actions/userAction.js";

const RegisterPage = () => {
  const dispatch = useDispatch();

  return (
    <Formik
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
        <Form className="w-[500px] mx-auto my-8 flex flex-col">
          <h1 className="text-center text-3xl mb-4 font-semibold">Welcome!</h1>
          <div>
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-black hover:underline transition"
              >
                Login
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <FormInput
              label="Name"
              type="text"
              name="name"
              placeholder="Enter your name"
            />
            <FormInput
              label="Email"
              type="text"
              name="email"
              placeholder="Enter your email"
            />
            <FormPasswordInput
              label="Password"
              name="password"
              placeholder="Enter your password"
            />
            <FormPasswordInput
              label="Confirm Password"
              name="passwordConfirm"
              placeholder="Confirm your password"
            />
            <Button
              type="submit"
              variant="fill"
              disabled={!formik.dirty || !formik.isValid}
            >
              Register
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

export default RegisterPage;
