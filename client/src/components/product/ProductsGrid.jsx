import ProductCard from "./ProductCard.jsx";
import ProductCardSkeleton from "./ProductCardSkeleton.jsx";

const ProductsGrid = ({ size = "md", products, isLoading }) => {
  const sizeClasses = {
    sm: "grid-cols-2",
    md: "grid-cols-3 md:grid-cols-2",
    lg: "grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2",
  };

  return isLoading ? (
    <div className={`grid ${sizeClasses[size]} gap-12 md:gap-6 sm:gap-4`}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  ) : products.length > 0 ? (
    <div className={`grid ${sizeClasses[size]} gap-12 md:gap-6 sm:gap-4`}>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isLoading={isLoading}
        />
      ))}
    </div>
  ) : (
    <p className="text-xl">No products available.</p>
  );
};

export default ProductsGrid;
