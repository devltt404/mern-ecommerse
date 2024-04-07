import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TableWithPagination } from "../../../../components/index.js";
import { getUsers } from "../../../../redux/actions/userAction.js";
import { userSelector } from "../../../../redux/slices/userSlice.js";
import UsersTable from "./components/UsersTable.jsx";

const UsersPage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalUsers, pagination } = useSelector(userSelector);

  useEffect(() => {
    dispatch(getUsers({ page, limit: 5 }));
  }, [searchParams]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">
        Users <span className="font-normal">({totalUsers})</span>
      </h1>

      <TableWithPagination
        Table={UsersTable}
        page={pagination.page}
        totalPages={pagination.totalPages}
        handlePageSelected={(page) => {
          navigate("/admin/users?page=" + page);
        }}
      />
    </div>
  );
};

export default UsersPage;
