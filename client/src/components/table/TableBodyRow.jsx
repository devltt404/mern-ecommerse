const TableBodyRow = ({ children, onClick = () => {}, canClick = false }) => {
  return (
    <tr
      onClick={onClick}
      className={`relative border-b bg-white ${canClick && "cursor-pointer"}`}
    >
      {children}
    </tr>
  );
};

export default TableBodyRow;
