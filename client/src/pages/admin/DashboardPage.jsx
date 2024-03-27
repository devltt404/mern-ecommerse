import { useEffect, useState } from "react";
import {
  FaBoxArchive,
  FaCartShopping,
  FaMoneyBill1Wave,
  FaUser,
} from "react-icons/fa6";
import BestSellingProducts from "../../components/BestSellingProducts.jsx";
import ReportCard from "../../components/ReportCard.jsx";
import SaleAreaChart from "../../components/SaleAreaChart.jsx";
import { adminAxios } from "../../utils/axiosInstances.js";

const DashboardPage = () => {
  const [statsLoading, setStatsLoading] = useState(true);

  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    salesInPastWeek: [],
    bestSellingProducts: []
  });

  const getStats = async () => {
    const { data } = await adminAxios.get("/stats");
    setStats(data);
    setStatsLoading(false);
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-8 mb-10">
        <ReportCard
          isLoading={statsLoading}
          Icon={FaMoneyBill1Wave}
          title="Total Revenue"
          value={"$" + stats.totalSales.toFixed(2)}
        />
        <ReportCard
          isLoading={statsLoading}
          Icon={FaBoxArchive}
          title="Total Orders"
          value={stats.totalOrders}
        />
        <ReportCard
          isLoading={statsLoading}
          Icon={FaCartShopping}
          title="Total Products"
          value={stats.totalProducts}
        />
        <ReportCard
          isLoading={statsLoading}
          Icon={FaUser}
          title="Total Users"
          value={stats.totalUsers}
        />
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <SaleAreaChart
            isLoading={statsLoading}
            salesData={stats.salesInPastWeek}
          />
        </div>

        <div className="col-span-4">
          <BestSellingProducts isLoading={statsLoading} products={stats.bestSellingProducts} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
