import { LuMinus, LuPlus } from "react-icons/lu";

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
    <div className="flex items-center rounded-3xl border-[1.5px] border-gray-300 px-2 py-2 h-fit">
      <button
        className="text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition"
        onClick={onMinus}
        disabled={quantity === min}
      >
        <LuMinus size={20} />
      </button>
      <input
        type="number"
        className="w-8 bg-transparent text-center outline-none"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        onBlur={onQuantityInputBlur}
      />
      <button
        className="text-gray-400 hover:text-black hover:bg-gray-50 transition"
        onClick={onPlus}
        disabled={quantity === max}
      >
        <LuPlus size={20} />
      </button>
    </div>
  );
};

export default QuantityInput;
