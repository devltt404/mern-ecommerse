import SkeletonWrapper from "./SkeletonWrapper.jsx";

const BestSellingProducts = ({ products, isLoading }) => {
  return (
    <SkeletonWrapper className="h-full" isLoading={isLoading}>
      <div className="h-full px-6 pt-6 bg-white shadow-lg">
        <h2 className="mb-2 text-xl font-semibold">Best selling</h2>
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
                  className="object-contain w-12 h-12 rounded"
                />
                <div className="min-w-0 ml-4">
                  <h3 className="font-medium truncate">{product.name}</h3>
                </div>
              </div>

              <p className="font-semibold">{product.numSold}</p>
            </li>
          ))}
        </ul>
      </div>
    </SkeletonWrapper>
  );
};

export default BestSellingProducts;
