const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full shadow-sm`}>{children}</table>
    </div>
  );
};

export default Table;
