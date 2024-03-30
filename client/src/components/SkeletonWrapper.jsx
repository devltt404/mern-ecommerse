const SkeletonWrapper = ({ isLoading, children, className = "" }) => {
  return (
    <div
      className={`${
        isLoading ? "bg-gray-300 animate-pulse *:invisible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default SkeletonWrapper;
