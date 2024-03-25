const CheckoutItem = ({ product, quantity }) => {
  return (
    <div className="grid grid-cols-[6rem,1fr,auto] gap-4">
      <img
        src={(product.images && product.images[0]) || product.image}
        alt="product"
        className="w-24 h-24 object-cover rounded-md"
      />
      <div>
        <h2 className="font-medium text-lg">{product.name}</h2>
        <p className="text-gray-500">Quantity: {quantity}</p>
      </div>
      <div>${product.price * quantity}</div>
    </div>
  );
};

export default CheckoutItem;
