import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoTrashOutline, IoTrashSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IconOutlineButton, QuantityInput } from "../../../components/index.js";
import {
  deleteCartItem,
  updateItemQuantity,
} from "../../../redux/actions/cartAction.js";

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
        updateItemQuantity({ id: product._id, quantity: product.stock }),
      );
    } else {
      if (inputQuantity === quantity) return;
      else if (inputQuantity === 0) dispatch(deleteCartItem(product._id));
      else
        dispatch(
          updateItemQuantity({
            id: product._id,
            quantity: Number(inputQuantity),
          }),
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
    <div className="grid w-full grid-cols-[6rem,1fr,5rem]">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images[0]}
          alt="product"
          className="h-24 w-24 self-center object-contain"
        />
      </Link>

      <div className="me-10 flex justify-between gap-6 px-4 xl:me-4 xl:flex-col">
        <Link to={`/product/${product._id}`}>
          <div>
            <p className="text-sm text-gray-500">{product.category.name}</p>
            <h3 className="text-lg font-medium">{product.name}</h3>
          </div>
        </Link>

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
