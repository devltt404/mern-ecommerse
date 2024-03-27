import SkeletonWrapper from "./SkeletonWrapper.jsx";

const BestSellingProducts = ({ products, isLoading }) => {
  return (
    <SkeletonWrapper className="h-full" isLoading={isLoading}>
      <div className="bg-white h-full pt-6 px-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Best selling</h2>
        <ul>
          {products.map((product) => (
            <li
              key={product._id}
              className="flex items-center gap-2 justify-between py-2 border-b-gray-300 [&:not(:last-child)]:border-b"
            >
              <div className="flex items-center">
                <img
                  src={product.images[0]}
                  alt="product"
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="ml-4 min-w-0">
                  <h3 className="text-sm font-semibold truncate">
                    {product.name}
                  </h3>
                </div>
              </div>

              <p className="text-sm font-semibold">{product.numSold}</p>
            </li>
          ))}
        </ul>
      </div>
    </SkeletonWrapper>
  );
};

export default BestSellingProducts;
