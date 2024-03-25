const SkeletonWrapper = ({ isLoading, children }) => {
  return (
    <div className="bg-gray-200 animate-pulse *:invisible">{children}</div>
  );
};

export default SkeletonWrapper;
