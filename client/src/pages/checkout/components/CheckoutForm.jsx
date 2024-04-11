import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TextFormInput from "../../../components/form/TextFormInput.jsx";
import { Button, CheckboxFormInput } from "../../../components/index.js";
import { createOrder } from "../../../redux/actions/orderAction.js";
import { orderSelector } from "../../../redux/slices/orderSlice.js";
import AddressForm from "./AddressForm.jsx";

const CheckoutForm = () => {
  const schema = Yup.object().shape({
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
      cvc: Yup.string().length(3, "Please enter a valid CVC"),
    }),
  });

  const { handleSubmit, setError, control, getValues, watch } = useForm({
    defaultValues: {
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
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const orderId = await dispatch(createOrder(data));
    navigate("/orders/" + orderId);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderLoading } = useSelector(orderSelector);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lg:order-1">
      <h2 className="mb-2 text-2xl font-semibold">Customer Info</h2>

      <div className="mb-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          <TextFormInput
            control={control}
            placeholder="First Name"
            name={`customer.firstName`}
          />
          <TextFormInput
            control={control}
            placeholder="Last Name"
            name={`customer.lastName`}
          />
        </div>
        <TextFormInput
          control={control}
          placeholder="Email"
          name={`customer.email`}
          type="email"
        />
        <TextFormInput
          control={control}
          name={`customer.phone`}
          placeholder="Phone Number"
        />
      </div>

      <AddressForm control={control} name="shippingAddress" />

      <CheckboxFormInput control={control} name="useSameAddress">
        Use the same address for billing
      </CheckboxFormInput>

      {!watch("useSameAddress") && (
        <AddressForm control={control} name="billingAddress" />
      )}

      <h2 className="mb-2 mt-4 text-2xl font-semibold">Payment</h2>

      <TextFormInput
        control={control}
        name="card.number"
        placeholder="Card number"
      />
      <div className="mb-6 mt-4 grid grid-cols-2 gap-2">
        <TextFormInput
          control={control}
          name="card.expiry"
          placeholder="2024/12"
        />
        <TextFormInput
          control={control}
          name="card.cvc"
          placeholder="CVC"
          type="password"
        />
      </div>

      <Button
        type="submit"
        variant="fill"
        width="full"
        isLoading={orderLoading}
      >
        CHECKOUT
      </Button>
    </form>
  );
};

export default CheckoutForm;
