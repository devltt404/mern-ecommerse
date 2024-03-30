import FormInput from "./FormInput.jsx";

const AddressForm = ({ name }) => {
  return (
    <div className="mt-4 mb-2">
      <h2 className="mb-1 text-2xl font-semibold">
        {name === "shippingAddress" ? "Shipping " : "Billing "} Address
      </h2>

      <div className="flex flex-col gap-2">
        <FormInput placeholder="Address" name={`${name}.address`} />

        <div className="grid grid-cols-3 gap-4">
          <FormInput placeholder="City" name={`${name}.city`} />
          <FormInput placeholder="State" name={`${name}.state`} />
          <FormInput placeholder="Postal Code" name={`${name}.postalCode`} />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
