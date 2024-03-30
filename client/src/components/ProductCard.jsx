import { Link } from "react-router-dom";
import RatingRow from "./RatingRow.jsx";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="transition bg-white cursor-pointer hover:scale-105">
        <img
          src={product.images[0]}
          alt="product"
          className="object-contain w-full aspect-square"
        />
        <div className="p-2">
          <p className="text-sm text-gray-500">{product.category.name}</p>
          <h3 className="-mt-1 text-lg font-semibold truncate ">
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
