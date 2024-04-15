import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Button,
  QuantityInput,
  RatingRow,
  SpinnerLoading,
} from "../../../components/index.js";
import { addCartItem } from "../../../redux/actions/cartAction.js";
import { getProductById } from "../../../redux/actions/productAction.js";
import { cartSelector } from "../../../redux/slices/cartSlice.js";
import { productSelector } from "../../../redux/slices/productSlice.js";
import ReviewArea from "./components/ReviewArea.jsx";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, productLoading } = useSelector(productSelector);
  const { cartLoading } = useSelector(cartSelector);
  const [quantity, setQuantity] = useState(1);

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    if (quantity == product.stock) {
      toast.error("Not enough stock");
    } else {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  return productLoading ? (
    <SpinnerLoading />
  ) : (
    product && (
      <div className="container py-8">
        <div className="mb-8 grid grid-cols-2 gap-14 md:grid-cols-1">
          <img
            src={product.images[0]}
            alt="Product"
            className="mx-auto max-h-[450px]"
          />

          <div>
            <p className="text-gray-700">{product.category.name}</p>
            <h2 className="mb-2 text-3xl font-semibold">{product.name}</h2>

            <div className="my-4 flex items-center gap-2">
              <RatingRow rating={product.rating} />
              <span>
                {product.rating} ({product.numOfReviews})
              </span>
              <div className="h-[15px] w-[1px] bg-gray-300"></div>
              <span>{product.stock} in stock</span>
              <div className="h-[15px] w-[1px] bg-gray-300"></div>
              <span>{product.numSold} sold</span>
            </div>

            <h3 className="mb-4 text-2xl font-medium">${product.price}</h3>
            <h3 className="mb-1 text-lg font-medium">Description</h3>
            <p className="leading-6 text-gray-600">{product.description}</p>

            <div className="my-6 flex items-center">
              <span className="me-4 font-medium">Quantity</span>
              <QuantityInput
                quantity={quantity}
                setQuantity={setQuantity}
                onMinus={handleMinus}
                onPlus={handlePlus}
              />
            </div>

            <Button
              variant="fill"
              onClick={() => dispatch(addCartItem(id, Number(quantity)))}
              isLoading={cartLoading}
              width="full"
            >
              Add to Cart
            </Button>
          </div>
        </div>
        <ReviewArea />
      </div>
    )
  );
};

export default ProductDetailPage;
