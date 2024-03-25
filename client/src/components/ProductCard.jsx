import { useNavigate } from "react-router-dom";
import RatingRow from "./RatingRow.jsx";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer"
      onClick={() => {
        navigate(`/product/${product._id}`);
      }}
    >
      <img
        src={product.images[0]}
        alt="product"
        className="w-full aspect-square object-cover"
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
  );
};

export default ProductCard;
