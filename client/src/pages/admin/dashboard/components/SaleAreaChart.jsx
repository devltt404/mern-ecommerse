import { ResponsiveLine } from "@nivo/line";
import { useCallback, useEffect, useState } from "react";
import {
  MultipleToggleRadio,
  SkeletonWrapper,
} from "../../../../components/index.js";
import { orderAxios } from "../../../../helpers/axiosInstances.js";

const SaleAreaChart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState("Week");
  const [formatedData, setFormatedData] = useState([]);

  const getSalesData = useCallback(async () => {
    setIsLoading(true);

    const { data } = await orderAxios.get("/sales", {
      params: {
        duration: selected.toLowerCase(),
      },
    });

    setFormatedData(
      data.map((sale) => {
        return {
          x: sale.date,
          y: sale.totalSales,
        };
      }),
    );

    setIsLoading(false);
  });

  useEffect(() => {
    getSalesData();
  }, [selected]);

  return (
    <SkeletonWrapper isLoading={isLoading}>
      <div className="bg-white pb-6 pt-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold">Sales Analytics</h2>

          <MultipleToggleRadio
            values={["Week", "Year"]}
            selected={selected}
            setSelected={setSelected}
            name="chart-options"
          />
        </div>

        <div className="h-[20rem] md:h-[18rem] sm:h-[15rem]">
          {formatedData.length > 0 && (
            <ResponsiveLine
              margin={{ top: 30, right: 40, bottom: 40, left: 70 }}
              data={[{ id: "sale", data: formatedData }]}
              xScale={{ type: "point" }}
              yScale={{ type: "linear" }}
              axisLeft={{ format: (v) => `$${v}` }}
              lineWidth={3}
              enableArea={true}
              enableGridX={false}
              enableGridY={true}
              theme={{
                axis: {
                  ticks: {
                    line: {
                      strokeWidth: 0,
                    },
                    text: {
                      fontSize: 12,
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
      </div>
    </SkeletonWrapper>
  );
};

export default SaleAreaChart;
