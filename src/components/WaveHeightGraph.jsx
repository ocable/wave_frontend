import { Axis } from "@visx/axis";
import { curveNatural } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath, AreaClosed } from "@visx/shape";
import { Text } from "@visx/text";
import { Grid } from "@visx/grid";
import { format } from "@visx/vendor/d3-format";

export default function WaveHeightGraph({
  GFSData,
  range,
  currentHour,
  increment = 1,
  setIncrement,
  windowStart = 0,
}) {
  const height = 200;
  const width = 350;

  const margin = {
    top: 10,
    bottom: 40,
    left: 30,
    right: 10,
  };

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.bottom;

  const METERS_TO_FEET = 3.28084;

  // Function to process GFS data and extract comp1 heights with times
  const processGFSData = (gfsData, range) => {
    if (!gfsData || gfsData.length === 0) {
      return { heights: [], times: [] };
    }
    // Determine next hour boundary in UTC (no local conversions to avoid off-by-one)
    const now = new Date();
    const nextHourUTCMS = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours() + 1, // next hour
      0,
      0,
      0
    );

    // Find first index whose UTC timestamp >= nextHourUTCMS
    let startIndex = gfsData.findIndex((d) => {
      const ts = Date.parse(d.timestamp); // RFC timestamp -> ms UTC
      return ts >= nextHourUTCMS;
    });
    if (startIndex === -1) {
      // If nothing is >= next hour, fallback to 0 so we still render something
      startIndex = 0;
    }

    // Extract comp1 heights (convert meters -> feet) and times for the specified range
    const heights = [];
    const times = [];

    for (
      let i = startIndex;
      i < gfsData.length && heights.length < range;
      i++
    ) {
      const dataEntry = gfsData[i];
      const comp1HeightMeters = parseFloat(dataEntry.comp1_height);
      if (!Number.isNaN(comp1HeightMeters)) {
        const comp1HeightFeet = comp1HeightMeters * METERS_TO_FEET;
        heights.push(comp1HeightFeet);
        times.push(new Date(dataEntry.timestamp));
      }
    }

    return { heights, times };
  };

  // Process the GFS data
  const full = processGFSData(GFSData, range + windowStart);
  // Slice the visible window
  const comp1Heights = full.heights.slice(windowStart, windowStart + range);
  const comp1Times = full.times.slice(windowStart, windowStart + range);

  // Create data array for visualization
  const data = [];
  for (let i = 0; i < comp1Heights.length; i++) {
    data.push({
      time: comp1Times[i],
      height: comp1Heights[i],
      index: i,
    });
  }
  // capture tick indices for drawing vertical guides
  let latestTickIndices = [];
  //   // If no data, return loading state
  //   if (data.length === 0) {
  //     return (
  //       <div
  //         className="flex items-center justify-center"
  //         style={{ height, width }}
  //       >
  //         <text style={{ fill: "#D9D9D9", fontSize: "14px" }}>
  //           {GFSDataLoading ? "Loading forecast data..." : "No data available"}
  //         </text>
  //       </div>
  //     );
  //   }

  const maxHeight = Math.max(...comp1Heights);
  // Add headroom: use whole-foot increments; ensure at least 0.5ft visual padding
  const roundedMax = Number.isFinite(maxHeight) ? Math.ceil(maxHeight) : 0;
  let paddedMax = roundedMax;
  if (Number.isFinite(maxHeight) && paddedMax - maxHeight < 0.5) {
    paddedMax += 1; // add one more whole-foot interval for visual padding
  }
  const minTime = comp1Times[0];
  const maxTime = comp1Times[comp1Times.length - 1];

  // X scale remains index-based for plotting, but tick labels will be derived dynamically
  const xScale = scaleLinear({
    range: [margin.left, margin.left + xMax],
    domain: [0, comp1Heights.length - 1],
  });

  const yScale = scaleLinear({
    range: [yMax, margin.top],
    domain: [0, paddedMax],
  });

  const colors = {
    white: "#FFFFFF",
    black: "#212121",
    gray: "#D9D9D9",
    darkGray: "#2A2A2A",
    accent: "#7EB9D4",
    darkAccent: "#7EB9D4",
  };

  return (
    <svg
      height={height}
      width={width}
      style={{ cursor: setIncrement ? "pointer" : "default" }}
      onClick={(e) => {
        if (!setIncrement || !comp1Heights.length) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left; // pixels within svg
        // Invert xScale: linear scale domain is [0, n-1]
        const scaled = ((x - margin.left) / xMax) * (comp1Heights.length - 1);
        let idx = Math.round(scaled);
        if (idx < 0) idx = 0;
        if (idx > comp1Heights.length - 1) idx = comp1Heights.length - 1;
        // increment is 1-based relative to first hour shown
        const newIncrement = idx + 1;
        if (newIncrement !== increment) setIncrement(newIncrement);
      }}
    >
      {/* Background Rectangle */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        style={{
          fill: colors.black,
        }}
        rx={20}
      />
      {/* Grid */}
      <Grid
        xScale={xScale}
        yScale={yScale}
        width={xMax}
        height={yMax}
        numTicksRows={paddedMax + 1}
        numTicksColumns={0} // suppress default vertical columns; custom guides drawn later
        top={0}
        left={margin.left}
        stroke={colors.darkGray}
      />
      {/* X Axis (dynamic hours or dates) */}
      {(() => {
        if (!data.length) return null;
        let tickIndices = [];
        if (range <= 24) {
          const step = range === 24 ? 2 : 1; // 2-hour ticks for 24h view
          const maxHours = Math.min(range, data.length);
          for (let i = 0; i < maxHours; i += step) tickIndices.push(i);
        } else if (range >= 72) {
          // Multi-day: choose step based on total hours to show multiple date labels
          // Aim ~12 ticks max
          const totalHours = Math.min(range, data.length); // data.length approximates hours ahead
          let hourStep;
          if (totalHours <= 96) hourStep = 12; // every half day
          else if (totalHours <= 168) hourStep = 24; // daily
          else hourStep = 24; // default daily
          for (let i = 0; i < data.length; i += hourStep) {
            tickIndices.push(i);
          }
          // Ensure last point's day appears
          if (tickIndices[tickIndices.length - 1] !== data.length - 1) {
            tickIndices.push(data.length - 1);
          }
        } else {
          // fallback treat as hourly range
          const maxHours = Math.min(range, data.length);
          for (let i = 0; i < maxHours; i++) tickIndices.push(i);
        }

        // Store for vertical guide rendering
        latestTickIndices = tickIndices.slice();
        // Offset-based labeling (0..range) while displaying absolute hour from currentHour
        return (
          <Axis
            scale={xScale}
            top={height - margin.bottom}
            orientation="bottom"
            stroke={colors.darkGray}
            strokeWidth={1.5}
            tickValues={tickIndices}
            tickLabelProps={() => ({
              fill: colors.gray,
              textAnchor: "middle",
              verticalAnchor: "middle",
              fontSize: 10,
            })}
            tickFormat={(value) => {
              const idx = Math.round(value);
              if (idx < 0 || idx >= data.length) return "";
              if (range <= 24) {
                const base =
                  typeof currentHour === "number"
                    ? currentHour
                    : data[0].time.getHours();
                const absoluteHour = (base + idx) % 24;
                return absoluteHour;
              }
              if (range >= 72) {
                const t = data[idx].time;
                return t.getMonth() + 1 + "/" + t.getDate();
              }
              return "";
            }}
          />
        );
      })()}
      {/* Vertical guide lines aligned with tick labels */}
      {latestTickIndices.map((ti, i) => {
        const xPos = xScale(ti);
        return (
          <line
            key={"vguide-" + i}
            x1={xPos}
            x2={xPos}
            y1={margin.top}
            y2={yMax}
            stroke={colors.darkGray}
            strokeWidth={0.75}
            opacity={0.6}
          />
        );
      })}
      {/* Moving selection line (increment - 1 index) */}
      {increment &&
        comp1Heights.length > 0 &&
        increment - 1 < comp1Heights.length && (
          <line
            x1={xScale(increment - 1)}
            x2={xScale(increment - 1)}
            y1={margin.top}
            y2={yMax}
            stroke={colors.accent}
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
        )}
      {/* Y Axis */}
      <Axis
        hideZero
        scale={yScale}
        numTicks={paddedMax + 1}
        left={margin.left}
        orientation="left"
        stroke={colors.darkGray}
        strokeWidth={1.5}
        tickLabelProps={() => ({
          fill: colors.gray,
          textAnchor: "end",
          verticalAnchor: "middle",
          fontSize: 10,
        })}
        tickFormat={(value) => `${value}ft`}
      />
      {/* Gradients for area and line */}
      <LinearGradient
        id="comp1-area-gradient"
        from={colors.accent}
        to={colors.accent}
        fromOpacity={0.35}
        toOpacity={0}
      />
      {/* Gradient for comp1 height line */}
      <LinearGradient
        id="comp1-gradient"
        from={colors.accent}
        to={colors.darkAccent}
      />
      {/* Shaded area under line */}
      <AreaClosed
        data={data}
        x={(d) => xScale(d.index)}
        y={(d) => yScale(d.height)}
        yScale={yScale}
        stroke={"none"}
        fill="url('#comp1-area-gradient')"
        curve={curveNatural}
      />
      <LinePath
        data={data}
        x={(d) => xScale(d.index)}
        y={(d) => yScale(d.height)}
        stroke="url('#comp1-gradient')"
        strokeWidth={2.5}
        curve={curveNatural}
      />
      {/* Y Axis label removed per request */}
      {/* X Axis label */}
      <Text
        style={{
          fill: colors.gray,
          fontSize: 11,
          fontWeight: 400,
        }}
        x={width / 2}
        y={height - 5}
        textAnchor="middle"
      ></Text>
    </svg>
  );
}
