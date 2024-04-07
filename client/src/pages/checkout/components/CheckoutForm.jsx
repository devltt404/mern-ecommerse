import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Button, Checkbox, TextFormInput } from "../../../components/index.js";
import { createOrder } from "../../../redux/actions/orderAction.js";
import AddressForm from "./AddressForm.jsx";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        useSameAddress: true,
        customer: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        },
        shippingAddress: {
          address: "",
          city: "",
          postalCode: "",
          state: "",
        },
        billingAddress: {
          address: "",
          city: "",
          state: "",
          postalCode: "",
        },
        card: {
          number: "4032037594818854",
          expiry: "2029-05",
          cvc: "474",
        },
      }}
      validationSchema={Yup.object().shape({
        customer: Yup.object().shape({
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          email: Yup.string().email().required("Email is required"),
          phone: Yup.string().required("Phone is required"),
        }),
        shippingAddress: Yup.object().shape({
          address: Yup.string().required("Address is required"),
          city: Yup.string().required("City is required"),
          postalCode: Yup.string().required("Postal Code is required"),
          state: Yup.string().required("State is required"),
        }),
        billingAddress: Yup.object().when("useSameAddress", {
          is: (value) => !value,
          then: () =>
            Yup.object().shape({
              address: Yup.string().required("Address is required"),
              city: Yup.string().required("City is required"),
              state: Yup.string().required("State is required"),
              postalCode: Yup.string().required("Postal Code is required"),
            }),
        }),
        card: Yup.object().shape({
          number: Yup.string().required("Card number is required"),
          expiry: Yup.string().required("Expiry is required"),
          cvc: Yup.string().required("CVC is required"),
        }),
      })}
      onSubmit={async (values) => {
        const orderId = await dispatch(createOrder(values));
        navigate("/orders/" + orderId);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="lg:order-1">
          <h2 className="mb-1 text-2xl font-semibold">Customer Info</h2>

          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-4">
              <TextFormInput
                placeholder="First Name"
                name={`customer.firstName`}
              />
              <TextFormInput
                placeholder="Last Name"
                name={`customer.lastName`}
              />
            </div>
            <TextFormInput
              placeholder="Email"
              name={`customer.email`}
              type="email"
            />
            <TextFormInput name={`customer.phone`} placeholder="Phone Number" />
          </div>

          <AddressForm name="shippingAddress" />

          <Checkbox
            checked={formik.values.useSameAddress}
            onChange={() =>
              formik.setFieldValue(
                "useSameAddress",
                !formik.values.useSameAddress,
              )
            }
          >
            Use the same address for billing
          </Checkbox>

          {!formik.values.useSameAddress && (
            <AddressForm name="billingAddress" />
          )}

          <h2 className="mt-4 text-2xl font-semibold">Payment</h2>

          <TextFormInput name="card.number" placeholder="Card number" />
          <div className="mb-6 mt-2 grid grid-cols-2 gap-4">
            <TextFormInput name="card.expiry" placeholder="2024/12" />
            <TextFormInput name="card.cvc" placeholder="CVC" type="password" />
          </div>

          <Button
            type="submit"
            variant="fill"
            width="full"
            disabled={!formik.dirty || !formik.isValid}
            isLoading={formik.isSubmitting}
          >
            CHECKOUT
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
