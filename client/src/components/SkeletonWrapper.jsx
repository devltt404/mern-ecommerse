const SkeletonWrapper = ({ isLoading, children, className = "" }) => {
  return (
    <div
      className={`${
        isLoading ? "bg-gray-200 animate-pulse *:invisible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default SkeletonWrapper;
