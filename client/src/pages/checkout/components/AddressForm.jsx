import { TextFormInput } from "../../../components/index.js";

const AddressForm = ({ name, control }) => {
  return (
    <div className="my-2">
      <h2 className="mb-2 text-2xl font-semibold">
        {name === "shippingAddress" ? "Shipping " : "Billing "} Address
      </h2>

      <div className="flex flex-col gap-4">
        <TextFormInput
          control={control}
          placeholder="Address"
          name={`${name}.address`}
        />

        <div className="grid grid-cols-3 gap-4">
          <TextFormInput
            control={control}
            placeholder="City"
            name={`${name}.city`}
          />
          <TextFormInput
            control={control}
            placeholder="State"
            name={`${name}.state`}
          />
          <TextFormInput
            control={control}
            placeholder="Postal Code"
            name={`${name}.postalCode`}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
