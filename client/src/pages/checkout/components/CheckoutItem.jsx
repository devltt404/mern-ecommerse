import { Link } from "react-router-dom";

const CheckoutItem = ({ product, quantity }) => {
  return (
    <Link to={"/product/" + product._id}>
      <div className="grid grid-cols-[6rem,1fr,auto] gap-2">
        <img
          src={(product.images && product.images[0]) || product.image}
          alt="product"
          className="h-20 w-20 object-contain "
        />
        <div>
          <h2 className="text-lg font-medium">{product.name}</h2>
          <p className="text-gray-500">Quantity: {quantity}</p>
        </div>
        <div>${(product.price * quantity).toFixed(2)}</div>
      </div>
    </Link>
  );
};

export default CheckoutItem;
