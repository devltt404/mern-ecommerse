const SkeletonWrapper = ({ isLoading, children, className = "" }) => {
  return (
    <div
      className={`${
        isLoading ? "animate-pulse bg-gray-300 *:invisible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default SkeletonWrapper;
