import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsList from "../components/ProductsList.jsx";
import { getIndexProducts } from "../redux/actions/productAction.js";
import { productSelector } from "../redux/slices/productSlice.js";

const IndexPage = () => {
  const dispatch = useDispatch();
  const { productLoading, topRated, bestSelling, latestProducts } =
    useSelector(productSelector);

  useEffect(() => {
    dispatch(getIndexProducts({}));
  }, []);

  return (
    <>
      <img
        src="https://casegear.in/cdn/shop/collections/BANNER_1600x483_4619e0a8-a847-4f88-a0d3-6c757f997faf.jpg?v=1686443967&width=2048"
        alt=""
      />
      <div className="container py-8">
        <div className="mb-10">
          <h1 className="font-semibold text-4xl mb-6 text-center">
            Best selling
          </h1>
          <div className="flex-1">
            <ProductsList
              products={bestSelling}
              isLoading={productLoading}
              size="lg"
            />
          </div>
        </div>
        <div className="mb-8">
          <h1 className="font-semibold text-4xl mb-6 text-center">Top Rated</h1>
          <div className="flex-1">
            <ProductsList
              products={topRated}
              isLoading={productLoading}
              size="lg"
            />
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-4xl mb-6 text-center">
            Latest Arrivals
          </h1>
          <ProductsList
            products={latestProducts}
            isLoading={productLoading}
            size="lg"
          />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
