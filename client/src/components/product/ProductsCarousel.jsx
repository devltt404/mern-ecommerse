import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import Slider from "react-slick";
import ProductCard from "./ProductCard.jsx";
import ProductCardSkeleton from "./ProductCardSkeleton.jsx";

const PrevArrow = ({ onClick }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="absolute -left-0 top-1/2 z-10 -translate-y-1/2 p-2 text-gray-500 transition hover:text-black"
      >
        <FaChevronLeft size={26} />
      </button>
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="absolute -right-0 top-1/2 z-10 -translate-y-1/2 p-2 text-gray-500 transition hover:text-black"
      >
        <FaChevronRight size={26} />
      </button>
    </div>
  );
};

function ProductsCarousel({ products, isLoading }) {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    accessibility: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {isLoading
          ? [1, 2, 3, 4, 5, 6].map((i) => (
              <div className="p-6 lg:p-4" key={i}>
                <ProductCardSkeleton />
              </div>
            ))
          : products.map((product) => (
              <div key={product._id} className="p-6 lg:p-4 md:p-2">
                <ProductCard product={product} isLoading={isLoading} />
              </div>
            ))}
      </Slider>
    </div>
  );
}

export default ProductsCarousel;
