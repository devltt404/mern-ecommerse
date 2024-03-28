import { ResponsiveLine } from "@nivo/line";
import { useCallback, useEffect, useState } from "react";
import { fakeSalesData } from "../fakedata/index.js";
import { orderAxios } from "../utils/axiosInstances.js";
import MultipleToggleRadio from "./MultipleToggleRadio.jsx";
import SkeletonWrapper from "./SkeletonWrapper.jsx";

const SaleAreaChart = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState("Demo");
  const [formmatedData, setFormmatedData] = useState([]);
  const [tickValues, setTickValues] = useState([]);

  const getSalesData = useCallback(async () => {
    setIsLoading(true);

    const { data } =
      selected !== "Demo"
        ? await orderAxios.get("/sales", {
            params: {
              duration: selected.toLowerCase(),
            },
          })
        : {
            data: fakeSalesData,
          };

    let maxSales = 0;
    setFormmatedData(
      data.map((sale) => {
        maxSales = Math.max(maxSales, sale.totalSales);
        return {
          x: sale.date,
          y: sale.totalSales,
        };
      })
    );

    const pow = Math.pow(10, String(parseInt(maxSales)).length - 1);
    maxSales = Math.floor(maxSales / pow) * pow;
    const step = maxSales / 4;
    setTickValues([step, step * 2, step * 3, step * 4]);

    setIsLoading(false);
  });

  useEffect(() => {
    getSalesData();
  }, [selected]);

  return (
    <SkeletonWrapper isLoading={isLoading}>
      <div className="py-6 bg-white shadow-lg px-8 h-[25rem]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Sales Analytics</h2>
          <MultipleToggleRadio
            values={["Demo", "Week", "Year"]}
            selected={selected}
            setSelected={setSelected}
            name="chart-options"
          />
        </div>
        {formmatedData.length > 0 && (
          <ResponsiveLine
            margin={{ top: 30, right: 30, bottom: 60, left: 70 }}
            data={[{ id: "sale", data: formmatedData }]}
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
            tooltip={({ point }) => (
              <div className="bg-white p-4 shadow-lg ">
                <h3 className="text-lg font-semibold">{point.data.x}</h3>
                <p className="text-gray-500">Sales: ${point.data.y}</p>
              </div>
            )}
          />
        )}
      </div>
    </SkeletonWrapper>
  );
};

export default SaleAreaChart;
