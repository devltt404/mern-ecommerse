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
    <div className="container py-8">
      <div className="flex gap-8 mb-8">
        <h1 className="font-semibold text-2xl mb-4">Best selling</h1>
        <div className="flex-1">
          <ProductsList
            products={bestSelling}
            isLoading={productLoading}
            size="md"
          />
        </div>
      </div>

      <div className="flex gap-8 mb-8">
        <h1 className="font-semibold text-2xl mb-4">Top Rated</h1>
        <div className="flex-1">
          <ProductsList
            products={topRated}
            isLoading={productLoading}
            size="md"
          />
        </div>
      </div>

      <div>
        <h1 className="font-semibold text-2xl mb-4">Latest releases</h1>
        <ProductsList
          products={latestProducts}
          isLoading={productLoading}
          size="lg"
        />
      </div>
    </div>
  );
};

export default IndexPage;
