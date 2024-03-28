import { Link } from "react-router-dom";
import RatingRow from "./RatingRow.jsx";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white hover:scale-105 transition cursor-pointer">
        <img
          src={product.images[0]}
          alt="product"
          className="w-full aspect-square object-contain"
        />

        <div className="p-3">
          <p className="text-gray-500 text-sm">{product.category.name}</p>
          <h3 className="text-lg font-semibold truncate -mt-1 ">
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
