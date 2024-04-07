import { Link } from "react-router-dom";
import RatingRow from "../rating/RatingRow.jsx";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="cursor-pointer bg-white transition hover:scale-105">
        <img
          src={product.images[0]}
          alt="product"
          className="aspect-square w-full object-contain"
        />
        <div className="p-2">
          <p className="text-sm text-gray-500">{product.category.name}</p>
          <h3 className="-mt-1 truncate text-lg font-semibold ">
            {product.name}
          </h3>
          <RatingRow rating={product.rating} />
          <p className="text-lg font-medium">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
