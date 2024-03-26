import { useState } from "react";
import toast from "react-hot-toast";
import { IoTrashOutline, IoTrashSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  updateItemQuantity,
} from "../redux/actions/cartAction.js";
import IconOutlineButton from "./IconOutlineButton.jsx";
import QuantityInput from "./QuantityInput.jsx";

const CartItem = ({ product, quantity }) => {
  const dispatch = useDispatch();

  const [inputQuantity, setInputQuantity] = useState(quantity);

  const onQuantityInputBlur = () => {
    if (inputQuantity < 1) {
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
    <div className="grid grid-cols-[6rem,1fr,auto,5rem] border-gray-300">
      <img
        src={product.images[0]}
        alt="product"
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="px-4 w-72">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-gray-500">{product.category.name}</p>
      </div>
      <div className="me-10">
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
      <div className="flex flex-col justify-between text-right text-lg">
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
  );
};

export default CartItem;
