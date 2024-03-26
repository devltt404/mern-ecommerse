import { useSelector } from "react-redux";
import UsersTable from "../../components/UsersTable.jsx";
import { userSelector } from "../../redux/slices/userSlice.js";

const UsersPage = () => {
  const { totalUsers } = useSelector(userSelector);

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
