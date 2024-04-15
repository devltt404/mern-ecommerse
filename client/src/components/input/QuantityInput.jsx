import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2";

const QuantityInput = ({
  quantity,
  setQuantity,
  onPlus,
  onMinus,

  onQuantityInputBlur = () => {},
}) => {
  return (
    <div className="flex h-fit w-fit items-center border border-gray-200 px-2 py-2 shadow-black transition focus-within:border-black focus-within:shadow-outer">
      <button
        className="text-gray-400 transition hover:text-black"
        onClick={onMinus}
      >
        <HiMiniMinus size={20} />
      </button>
      <input
        type="number"
        className="w-6 bg-transparent text-center outline-none"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value) || "")}
        onBlur={onQuantityInputBlur}
      />
      <button
        className="text-gray-400 transition hover:text-black"
        onClick={onPlus}
      >
        <HiMiniPlus size={20} />
      </button>
    </div>
  );
};

export default QuantityInput;
