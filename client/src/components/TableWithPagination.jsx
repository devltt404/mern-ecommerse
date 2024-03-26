import Pagination from "./Pagination.jsx";

const TableWithPagination = ({ Table, handlePageSelected, page, totalPages }) => {
  return (
    <div>
      <Table />
      <div className="p-4 flex justify-center">
        <Pagination
          handlePageSelected={handlePageSelected}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default TableWithPagination;
