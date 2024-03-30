const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg">
      <div className="w-full aspect-square"></div>
      <div className="p-2">
        <div className="w-3/4 h-4 mb-2 bg-gray-300 rounded"></div>
        <div className="w-full h-6 mb-2 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-4 mb-2 bg-gray-300 rounded"></div>
        <div className="w-1/3 h-4 mb-2 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
