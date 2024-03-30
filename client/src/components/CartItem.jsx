import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoTrashOutline, IoTrashSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteCartItem,
  updateItemQuantity,
} from "../redux/actions/cartAction.js";
import IconOutlineButton from "./IconOutlineButton.jsx";
import QuantityInput from "./QuantityInput.jsx";

const CartItem = ({ product, quantity }) => {
  const dispatch = useDispatch();

  const [inputQuantity, setInputQuantity] = useState(quantity);

  useEffect(() => {
    setInputQuantity(quantity);
  }, [quantity]);

  const onQuantityInputBlur = () => {
    if (inputQuantity == 0) {
      dispatch(deleteCartItem(product._id));
    } else if (inputQuantity < 0) {
      toast.error("Quantity cannot be less than 0");
      setInputQuantity(1);
      dispatch(updateItemQuantity({ id: product._id, quantity: 1 }));
    } else if (inputQuantity > product.stock) {
      toast.error("Not enough stock");
      setInputQuantity(product.stock);
      dispatch(
        updateItemQuantity({ id: product._id, quantity: product.stock })
      );
    } else {
      if (inputQuantity === quantity) return;
      else if (inputQuantity === 0) dispatch(deleteCartItem(product._id));
      else
        dispatch(
          updateItemQuantity({
            id: product._id,
            quantity: Number(inputQuantity),
          })
        );
    }
  };

  const handlePlus = () => {
    dispatch(updateItemQuantity({ id: product._id, quantity: quantity + 1 }));
  };

  const handleMinus = () => {
    if (quantity === 1) dispatch(deleteCartItem(product._id));
    else
      dispatch(updateItemQuantity({ id: product._id, quantity: quantity - 1 }));
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="w-full grid grid-cols-[6rem,1fr,5rem]">
        <img
          src={product.images[0]}
          alt="product"
          className="self-center object-contain w-24 h-24"
        />

        <div className="flex justify-between gap-6 px-4 xl:flex-col me-10 xl:me-4">
          <div>
            <p className="text-sm text-gray-500">{product.category.name}</p>
            <h3 className="text-lg font-medium">{product.name}</h3>
          </div>

          <div>
            <QuantityInput
              quantity={inputQuantity}
              setQuantity={setInputQuantity}
              onPlus={handlePlus}
              onMinus={handleMinus}
              min={0}
              max={product.stock}
              onQuantityInputBlur={onQuantityInputBlur}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between text-lg text-right">
          <p className="font-semibold">
            ${(product.price * quantity).toFixed(2)}
          </p>
          <div>
            <IconOutlineButton
              Icon={IoTrashOutline}
              HoverIcon={IoTrashSharp}
              onClick={() => {
                dispatch(deleteCartItem(product._id));
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CartItem;
