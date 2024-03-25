import {
  FaBoxArchive,
  FaCartShopping,
  FaMoneyBill1Wave,
  FaUser,
} from "react-icons/fa6";
import ReportCard from "../../components/ReportCard.jsx";

const DashboardPage = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-8">
        <ReportCard
          Icon={FaMoneyBill1Wave}
          title="Total Revenue"
          value="$5000"
        />
        <ReportCard Icon={FaBoxArchive} title="Total Orders" value="24" />
        <ReportCard Icon={FaCartShopping} title="Total Products" value="100" />
        <ReportCard Icon={FaUser} title="Total Users" value="2300" />
      </div>
    </div>
  );
};

export default DashboardPage;
