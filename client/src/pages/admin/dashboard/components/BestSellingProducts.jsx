import { SkeletonWrapper } from "../../../../components/index.js";

const BestSellingProducts = ({ products, isLoading }) => {
  return (
    <SkeletonWrapper className="h-full" isLoading={isLoading}>
      <div className="h-full bg-white px-6 pt-6 shadow-lg">
        <h2 className="mb-2 text-xl font-semibold">Best selling</h2>
        <ul>
          {products.map((product) => (
            <li
              key={product._id}
              className="flex items-center justify-between gap-2 border-b-gray-300 py-2 [&:not(:last-child)]:border-b"
            >
              <div className="flex items-center">
                <img
                  src={product.images[0]}
                  alt="product"
                  className="h-12 w-12 rounded object-contain"
                />
                <div className="ml-4 min-w-0">
                  <h3 className="truncate font-medium">{product.name}</h3>
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
