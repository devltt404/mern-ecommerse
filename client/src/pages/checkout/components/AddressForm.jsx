import { TextFormInput } from "../../../components/index.js";

const AddressForm = ({ name }) => {
  return (
    <div className="mb-2 mt-4">
      <h2 className="mb-1 text-2xl font-semibold">
        {name === "shippingAddress" ? "Shipping " : "Billing "} Address
      </h2>

      <div className="flex flex-col gap-2">
        <TextFormInput placeholder="Address" name={`${name}.address`} />

        <div className="grid grid-cols-3 gap-4">
          <TextFormInput placeholder="City" name={`${name}.city`} />
          <TextFormInput placeholder="State" name={`${name}.state`} />
          <TextFormInput
            placeholder="Postal Code"
            name={`${name}.postalCode`}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
