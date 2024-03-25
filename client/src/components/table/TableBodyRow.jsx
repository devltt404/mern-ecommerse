const TableBodyRow = ({ children, onClick = () => {}, canClick = false }) => {
  return (
    <tr
      onClick={onClick}
      className={`bg-white border-b relative ${canClick && "cursor-pointer"}`}
    >
      {children}
    </tr>
  );
};

export default TableBodyRow;
