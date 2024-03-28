import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import Loading from "../components/Loading.jsx";
import QuantityInput from "../components/QuantityInput.jsx";
import RatingRow from "../components/RatingRow.jsx";
import ReviewArea from "../components/ReviewArea.jsx";
import { addCartItem } from "../redux/actions/cartAction.js";
import { getProductById } from "../redux/actions/productAction.js";
import { cartSelector } from "../redux/slices/cartSlice.js";
import { productSelector } from "../redux/slices/productSlice.js";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    dispatch(getProductById(navigate, id));
  }, [id]);

  return productLoading ? (
    <Loading />
  ) : (
    product && (
      <div className="container py-8">
        <div className="grid gap-8 grid-cols-2 mb-4">
          <div>
            <img src={product.images[0]} alt="Product" />
          </div>
          <div>
            <p className="text-gray-700">{product.category.name}</p>
            <h2 className="text-3xl mb-2 font-semibold">{product.name}</h2>

            <div className="flex items-center gap-2 mb-2">
              <RatingRow rating={product.rating} />
              <span>
                {product.rating} ({product.numOfReviews})
              </span>
              <div className="bg-gray-300 w-[1px] h-[15px]"></div>
              <span>{product.stock} in stock</span>
              <div className="bg-gray-300 w-[1px] h-[15px]"></div>
              <span>{product.numSold} sold</span>
            </div>

            <h3 className="text-2xl mb-2 font-medium">${product.price}</h3>
            <h3 className="font-medium">Description</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center mb-6">
              <span className="font-medium me-4">Quantity</span>
              <QuantityInput
                quantity={quantity}
                setQuantity={setQuantity}
                onMinus={handleMinus}
                onPlus={handlePlus}
                min={1}
                max={product.stock}
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
