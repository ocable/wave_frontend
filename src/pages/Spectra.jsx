import { LineChart } from "@mui/x-charts";
import {
  AreaChart,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  useGetSpectralDataQuery,
  useGetSignificantDataQuery,
  useGetSwellComponentDataQuery,
} from "./spectralSlice";

// import { ChartsXAxis, ChartsYAxis } from "@mui/x-charts";

export default function Spectra() {
  const { data: spectralData, isLoading } = useGetSpectralDataQuery();
  const data = [];

  // Filter periods to be less than 22

  const filtered_periods = [];

  if (isLoading) {
    console.log("Loading ...");
  } else {
    for (let i = 0; i < spectralData.periods.length; i++) {
      data.push({
        period: spectralData.periods[i],
        density: spectralData.densities[i],
      });
    }
  }

  return (
    <>
      {isLoading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <LineChart
            xAxis={[{ data: spectralData.periods, label: "Period (sec)" }]}
            // yAxis={[{ label: 'Density (m^2/Hz)' }]}
            series={[
              {
                data: spectralData.densities,
                area: true,
                label: "Density vs Period",
                showMark: false,
              },
            ]}
            width={1000}
            height={600}
            tooltip={{ trigger: "none" }}
          />

          {/* <LineChart
            width={1000}
            height={800}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="density" stroke="#8884d8" />
          </LineChart> */}

          <AreaChart
            width={1000}
            height={500}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis />
            <YAxis />
            <CartesianGrid strokeDasharray="4 4" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="density"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </div>
      )}
    </>
  );
}
