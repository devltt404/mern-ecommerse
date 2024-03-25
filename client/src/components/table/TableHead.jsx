const TableHead = ({ children }) => {
  return (
    <thead className="text-gray-700 uppercase bg-stone-200">
      <tr className="text-sm font-bold">{children}</tr>
    </thead>
  );
};

export default TableHead;
