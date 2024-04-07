const TableHead = ({ children }) => {
  return (
    <thead className="bg-stone-200 uppercase text-gray-700">
      <tr className="text-sm font-bold">{children}</tr>
    </thead>
  );
};

export default TableHead;
