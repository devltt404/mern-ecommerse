import { useInView } from "@react-spring/web";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animated } from "react-spring";

import { ProductsCarousel, ProductsGrid } from "../../components/index.js";
import { getIndexProducts } from "../../redux/actions/productAction.js";
import { productSelector } from "../../redux/slices/productSlice.js";

const IndexPage = () => {
  const dispatch = useDispatch();
  const { productLoading, topRated, bestSelling, latestProducts } =
    useSelector(productSelector);

  const createAnimatedDiv = () => {
    const [ref, spring] = useInView(
      () => ({
        from: { opacity: 0, transform: "translateY(50px)" },
        to: { opacity: 1, transform: "translateY(0px)" },
        config: {
          duration: 300,
          tension: 50,
          friction: 800,
        },
      }),
      { once: true },
    );
    return [ref, spring];
  };

  const [bestSellingRef, bestSellingSpring] = createAnimatedDiv();
  const [topRatedRef, topRatedSpring] = createAnimatedDiv();
  const [latestArrivalsRef, latestArrivalsSpring] = createAnimatedDiv();

  useEffect(() => {
    dispatch(getIndexProducts({}));
  }, []);

  return (
    <>
      <img
        src="https://casegear.in/cdn/shop/collections/BANNER_1600x483_4619e0a8-a847-4f88-a0d3-6c757f997faf.jpg?v=1686443967&width=2048"
        alt=""
        className="mx-auto max-h-[470px] min-h-[120px] w-full object-cover"
      />
      <div className="container py-14">
        <animated.div
          ref={bestSellingRef}
          style={bestSellingSpring}
          className="mb-8"
        >
          <h1 className="mb-6 text-center text-3xl font-semibold">
            Best selling
          </h1>
          <div>
            <ProductsCarousel
              products={bestSelling}
              isLoading={productLoading}
            />
          </div>
        </animated.div>

        <animated.div className="mb-8" ref={topRatedRef} style={topRatedSpring}>
          <h1 className="mb-6 text-center text-3xl font-semibold">Top Rated</h1>
          <ProductsCarousel products={topRated} isLoading={productLoading} />
        </animated.div>

        <animated.div ref={latestArrivalsRef} style={latestArrivalsSpring}>
          <h1 className="mb-6 text-center text-3xl font-semibold">
            Latest Arrivals
          </h1>
          <ProductsGrid
            products={latestProducts}
            isLoading={productLoading}
            size="lg"
          />
        </animated.div>
      </div>
    </>
  );
};

export default IndexPage;
