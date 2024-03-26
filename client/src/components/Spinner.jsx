const Spinner = ({ borderWidth = "normal" }) => {
  const borderWidthClasses = {
    thin: "border-[3px]",
    normal: "border-[6px]",
    thick: "border-[8px]",
  };

  return (
    <div
      className={`border-gray-300 w-full aspect-square animate-spin rounded-full ${borderWidthClasses[borderWidth]} border-t-black`}
    ></div>
  );
};

export default Spinner;
