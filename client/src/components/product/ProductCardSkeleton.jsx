const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-gray-200">
      <div className="aspect-square w-full"></div>
      <div className="p-2">
        <div className="mb-2 h-4 w-3/4 bg-gray-300"></div>
        <div className="mb-2 h-6 w-full bg-gray-300"></div>
        <div className="mb-2 h-3 w-1/2 bg-gray-300"></div>
        <div className="mb-2 h-4 w-1/3 bg-gray-300"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
