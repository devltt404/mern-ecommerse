import Loading from "./Loading.jsx";
import ProductCard from "./ProductCard.jsx";

const ProductsList = ({ size = "md", products, isLoading }) => {
  const sizeClasses = {
    sm: "grid-cols-2",
    md: "grid-cols-3",
    lg: "grid-cols-4",
  };

  return isLoading ? (
    <Loading />
  ) : products.length > 0 ? (
    <div className={`grid ${sizeClasses[size]} gap-12`}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  ) : (
    <p className="text-xl">No products available.</p>
  );
};

export default ProductsList;
