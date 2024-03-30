const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`shadow-sm w-full`}>{children}</table>
    </div>
  );
};

export default Table;
