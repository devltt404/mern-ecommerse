import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCardsCarousel from "../components/ProductCardsCarousel.jsx";
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
        className="mx-auto min-h-[120px] max-h-[470px] w-full object-cover"
      />
      <div className="container py-14">
        <div className="mb-8">
          <h1 className="mb-6 text-3xl font-semibold text-center">
            Best selling
          </h1>
          <div>
            <ProductCardsCarousel
              products={bestSelling}
              isLoading={productLoading}
            />
          </div>
        </div>

        <div className="mb-8">
          <h1 className="mb-6 text-3xl font-semibold text-center">Top Rated</h1>
          <ProductCardsCarousel
            products={topRated}
            isLoading={productLoading}
          />
        </div>

        <div>
          <h1 className="mb-6 text-3xl font-semibold text-center">
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
