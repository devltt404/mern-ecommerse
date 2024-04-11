import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2";

const QuantityInput = ({
  quantity,
  setQuantity,
  onPlus,
  onMinus,
  min,
  max,
  onQuantityInputBlur = () => {},
}) => {
  return (
    <div className="flex h-fit w-fit items-center border border-gray-200 px-2 py-2 focus-within:border-black focus-within:shadow-outer shadow-black transition">
      <button
        className="text-gray-400 transition hover:text-black"
        onClick={onMinus}
        disabled={quantity === min}
      >
        <HiMiniMinus size={20} />
      </button>
      <input
        type="number"
        className="w-6 bg-transparent text-center outline-none"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        onBlur={onQuantityInputBlur}
      />
      <button
        className="text-gray-400 transition hover:text-black"
        onClick={onPlus}
        disabled={quantity === max}
      >
        <HiMiniPlus size={20} />
      </button>
    </div>
  );
};

export default QuantityInput;
