import Pagination from "./Pagination.jsx";

const TableWithPagination = ({
  Table,
  handlePageSelected,
  page,
  totalPages,
}) => {
  return (
    <div >
      <Table />

      <Pagination
        handlePageSelected={handlePageSelected}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default TableWithPagination;
