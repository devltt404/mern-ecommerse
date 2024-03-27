import { ResponsiveLine } from "@nivo/line";
import SkeletonWrapper from "./SkeletonWrapper.jsx";

const SaleAreaChart = ({ salesData, isLoading }) => {
  let maxSales = 0,
    formattedData,
    pow,
    step,
    tickValues;

  if (salesData) {
    formattedData = salesData.map((sale) => {
      if (sale.totalSales > maxSales) {
        maxSales = sale.totalSales;
      }
      return {
        x: sale.date,
        y: sale.totalSales,
      };
    });

    pow = Math.pow(10, String(parseInt(maxSales)).length - 1);
    maxSales = Math.floor(maxSales / pow) * pow;
    step = maxSales / 4;
    tickValues = [step, step * 2, step * 3, step * 4];
  }

  return (
    <SkeletonWrapper isLoading={isLoading}>
      <div className="py-6 bg-white shadow-lg px-8 h-[25rem]">
        <h2 className="text-xl font-semibold">Sales Analytics</h2>
        {salesData.length > 0 && (
          <ResponsiveLine
            margin={{ top: 30, right: 30, bottom: 60, left: 70 }}
            data={[{ id: "sale", data: formattedData }]}
            xScale={{ type: "point" }}
            yScale={{ type: "linear" }}
            axisLeft={{ format: (v) => `$${v}`, tickValues }}
            lineWidth={3}
            enableArea={true}
            enableGridX={false}
            gridYValues={tickValues}
            enableGridY={true}
            theme={{
              axis: {
                ticks: {
                  line: {
                    strokeWidth: 0,
                  },
                  text: {
                    fontSize: 15,
                    fontFamily: "Satoshi",
                    fill: "gray",
                  },
                },
              },
            }}
            colors={["#171717"]}
            curve="monotoneX"
            pointColor="white"
            pointBorderWidth={2}
            pointBorderColor="#171717"
            useMesh={true}
            pointSize={8}
          />
        )}
      </div>
    </SkeletonWrapper>
  );
};

export default SaleAreaChart;
