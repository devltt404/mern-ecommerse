const CheckoutItem = ({ product, quantity }) => {
  return (
    <div className="grid grid-cols-[6rem,1fr,auto] gap-2">
      <img
        src={(product.images && product.images[0]) || product.image}
        alt="product"
        className="w-20 h-20 object-contain "
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
