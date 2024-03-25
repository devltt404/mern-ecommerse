import FormInput from "./FormInput.jsx";

const AddressForm = ({ name }) => {
  return (
    <div className="mt-2">
      <h2 className="font-semibold text-2xl">
        {name === "shippingAddress" ? "SHIPPING " : "BILLING "} ADDRESS
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
