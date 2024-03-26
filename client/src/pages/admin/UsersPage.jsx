import { useDispatch, useSelector } from "react-redux";
import TableWithPagination from "../../components/TableWithPagination.jsx";
import UsersTable from "../../components/UsersTable.jsx";
import { getUsers } from "../../redux/actions/userAction.js";
import { userSelector } from "../../redux/slices/userSlice.js";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { totalUsers, pagination } = useSelector(userSelector);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">
        Users <span className="font-normal">({totalUsers})</span>
      </h1>
      
      <TableWithPagination
        Table={UsersTable}
        page={pagination.page}
        totalPages={pagination.totalPages}
        handlePageSelected={(page) => {
          dispatch(getUsers({ page, limit: 5 }));
        }}
      />
    </div>
  );
};

export default UsersPage;
