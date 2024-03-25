import { useSelector } from "react-redux";
import UsersTable from "../../components/UsersTable.jsx";
import { usersSelector } from "../../redux/slices/usersSlice.js";

const UsersPage = () => {
  const { totalUsers } = useSelector(usersSelector);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">
        Users <span className="font-normal">({totalUsers})</span>
      </h1>
      <UsersTable />
    </div>
  );
};

export default UsersPage;
