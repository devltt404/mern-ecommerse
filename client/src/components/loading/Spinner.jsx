const Spinner = ({ borderWidth = "normal" }) => {
  const borderWidthClasses = {
    thin: "border-[2.5px]",
    normal: "border-[6px]",
    thick: "border-[8px]",
  };

  return (
    <div
      className={`aspect-square w-full animate-spin rounded-full border-gray-300 ${borderWidthClasses[borderWidth]} border-t-black`}
    ></div>
  );
};

export default Spinner;
