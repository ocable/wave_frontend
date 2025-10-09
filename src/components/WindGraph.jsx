import { Axis } from "@visx/axis";
import { curveNatural } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath, AreaClosed } from "@visx/shape";
import { Text } from "@visx/text";
import { Grid } from "@visx/grid";
import { format } from "@visx/vendor/d3-format";

export default function WindGraph({
  windData,
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
    bottom: 50, // Increased to make room for arrows and labels
    left: 30,
    right: 10,
  };

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.bottom;

  // Function to process wind data and extract speeds with times
  const processWindData = (windDataArray, range) => {
    if (!windDataArray || windDataArray.length === 0) {
      return { speeds: [], directions: [], times: [] };
    }

    // Determine next hour boundary in UTC
    const now = new Date();
    const nextHourUTCMS = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours() + 1,
      0,
      0,
      0
    );

    // Find first index whose UTC timestamp >= nextHourUTCMS
    let startIndex = windDataArray.findIndex((d) => {
      const ts = Date.parse(d.timestamp);
      return ts >= nextHourUTCMS;
    });

    if (startIndex === -1) {
      startIndex = 0;
    }

    // Extract wind speeds, directions, and times for the specified range
    // Convert from knots to mph (1 kt = 1.15078 mph)
    const speeds = [];
    const directions = [];
    const times = [];
    const directionTypes = [];

    for (
      let i = startIndex;
      i < windDataArray.length && speeds.length < range;
      i++
    ) {
      const dataEntry = windDataArray[i];
      const windSpeedKts = parseFloat(dataEntry.speed);
      const windDirection = parseFloat(dataEntry.direction);

      if (!Number.isNaN(windSpeedKts) && !Number.isNaN(windDirection)) {
        speeds.push(windSpeedKts * 1.15078); // Convert knots to mph
        directions.push(windDirection);
        times.push(new Date(dataEntry.timestamp));
        directionTypes.push(dataEntry.directionType || null);
      }
    }

    return { speeds, directions, times, directionTypes };
  };

  // Process the wind data
  const full = processWindData(windData, range + windowStart);
  // Slice the visible window
  const windSpeeds = full.speeds.slice(windowStart, windowStart + range);
  const windDirections = full.directions.slice(
    windowStart,
    windowStart + range
  );
  const windTimes = full.times.slice(windowStart, windowStart + range);
  const windDirectionTypes = full.directionTypes.slice(
    windowStart,
    windowStart + range
  );

  // Create data array for visualization
  const data = [];
  for (let i = 0; i < windSpeeds.length; i++) {
    data.push({
      time: windTimes[i],
      speed: windSpeeds[i],
      direction: windDirections[i],
      directionType: windDirectionTypes[i],
      index: i,
    });
  }

  // Capture tick indices for drawing vertical guides
  let latestTickIndices = [];

  const maxSpeed = Math.max(...windSpeeds, 5); // Minimum 5kt for scale
  // Round up to nearest 5 kt increment
  const roundedMax = Math.ceil(maxSpeed / 5) * 5;
  let paddedMax = roundedMax;
  if (Number.isFinite(maxSpeed) && paddedMax - maxSpeed < 2) {
    paddedMax += 5; // Add one more 5kt interval for visual padding
  }

  // X scale remains index-based for plotting
  const xScale = scaleLinear({
    range: [margin.left, margin.left + xMax],
    domain: [0, windSpeeds.length - 1],
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
    offshore: "#22c55e", // green-500
    crossshore: "#f97316", // orange-500
    onshore: "#ef4444", // red-500
  };

  // Function to get color based on direction type
  const getDirectionColor = (directionType) => {
    if (!directionType) return colors.accent;

    const direction = directionType.toLowerCase();

    if (direction.includes("onshore")) {
      return colors.onshore;
    } else if (direction.includes("cross") || direction.includes("side")) {
      return colors.crossshore;
    } else if (direction.includes("offshore")) {
      return colors.offshore;
    }

    return colors.accent;
  };

  // Function to convert wind direction (degrees) to arrow rotation
  // Wind direction is where wind is coming FROM, so arrow points TO that direction
  // We need to rotate 180° to show where wind is GOING
  const getArrowRotation = (direction) => {
    return (direction + 180) % 360;
  };

  return (
    <div className="flex justify-center w-full">
      <svg
        height={height}
        width={width}
        style={{ cursor: setIncrement ? "pointer" : "default" }}
        onClick={(e) => {
          if (!setIncrement || !windSpeeds.length) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const scaled = ((x - margin.left) / xMax) * (windSpeeds.length - 1);
          let idx = Math.round(scaled);
          if (idx < 0) idx = 0;
          if (idx > windSpeeds.length - 1) idx = windSpeeds.length - 1;
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
          numTicksRows={paddedMax / 5 + 1}
          numTicksColumns={0}
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
            // Multi-day: Calculate dates based on today + range
            const today = new Date();
            const totalHours = Math.min(range, data.length);
            let hourStep;

            if (totalHours <= 96) hourStep = 24; // daily for 4 days or less
            else if (totalHours <= 168) hourStep = 24; // daily for a week
            else hourStep = 48; // every 2 days for longer periods

            tickIndices = [];
            for (let i = 0; i < data.length; i += hourStep) {
              if (i < data.length) {
                tickIndices.push(i);
              }
            }

            // Always include the last point if it's not too close to the previous tick
            const lastIdx = data.length - 1;
            if (lastIdx > 0 && tickIndices.length > 0) {
              const lastTick = tickIndices[tickIndices.length - 1];
              if (lastIdx - lastTick >= 12) {
                // at least 12 hours apart
                tickIndices.push(lastIdx);
              }
            }
          } else {
            // fallback treat as hourly range
            const maxHours = Math.min(range, data.length);
            for (let i = 0; i < maxHours; i++) tickIndices.push(i);
          }

          // Store for vertical guide rendering
          latestTickIndices = tickIndices.slice();

          return (
            <Axis
              orientation="bottom"
              scale={xScale}
              top={yMax + 10} // Position labels closer to arrows
              left={0}
              stroke="transparent" // Hide the axis line
              strokeWidth={0}
              tickValues={tickIndices}
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
                  // Calculate date based on today + hours offset (including windowStart)
                  const today = new Date();
                  const hoursFromNow = windowStart + idx;
                  const targetDate = new Date(
                    today.getTime() + hoursFromNow * 60 * 60 * 1000
                  );
                  // Format as M/D to show month/day
                  return targetDate.getMonth() + 1 + "/" + targetDate.getDate();
                }

                return "";
              }}
              tickLabelProps={() => ({
                fill: colors.gray,
                fontSize: 10,
                textAnchor: "middle",
                verticalAnchor: "middle",
              })}
            />
          );
        })()}

        {/* Y Axis */}
        <Axis
          hideZero
          orientation="left"
          scale={yScale}
          left={margin.left}
          stroke={colors.darkGray}
          strokeWidth={1.5}
          numTicks={paddedMax / 5 + 1}
          tickFormat={(v) => `${v}`}
          tickLabelProps={() => ({
            fill: colors.gray,
            fontSize: 10,
            textAnchor: "end",
            verticalAnchor: "middle",
          })}
        />

        {/* Vertical guide lines at ticks */}
        {latestTickIndices.map((idx) => {
          const cx = xScale(idx);
          return (
            <line
              key={`vguide-${idx}`}
              x1={cx}
              x2={cx}
              y1={margin.top}
              y2={yMax}
              stroke={colors.darkGray}
              strokeWidth={0.75}
              opacity={0.6}
            />
          );
        })}

        {/* Horizontal gradient along x-axis that changes color based on wind direction */}
        <defs>
          <linearGradient
            id="horizontalWindColors"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            {data.map((d, i) => {
              const color = getDirectionColor(d.directionType);
              const position = (i / Math.max(data.length - 1, 1)) * 100;
              return (
                <stop
                  key={`stop-${i}`}
                  offset={`${position}%`}
                  stopColor={color}
                />
              );
            })}
          </linearGradient>

          {/* Vertical gradient for area - uses horizontal colors but fades vertically */}
          <linearGradient
            id="windAreaGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="url(#horizontalWindColors)"
              stopOpacity="0.35"
            />
            <stop
              offset="100%"
              stopColor="url(#horizontalWindColors)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* Area under the wind speed line with smooth gradient */}
        {data.length > 0 && (
          <g>
            {/* Create the area with the horizontal color gradient */}
            <AreaClosed
              data={data}
              x={(d) => xScale(d.index)}
              y={(d) => yScale(d.speed)}
              yScale={yScale}
              strokeWidth={0}
              fill="url(#horizontalWindColors)"
              fillOpacity={0.35}
              curve={curveNatural}
              style={{ mixBlendMode: "normal" }}
            />
            {/* Overlay with vertical fade to black */}
            <defs>
              <linearGradient
                id="verticalFadeOverlay"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor={colors.black} stopOpacity="0" />
                <stop offset="100%" stopColor={colors.black} stopOpacity="1" />
              </linearGradient>
            </defs>
            <AreaClosed
              data={data}
              x={(d) => xScale(d.index)}
              y={(d) => yScale(d.speed)}
              yScale={yScale}
              strokeWidth={0}
              fill="url(#verticalFadeOverlay)"
              curve={curveNatural}
            />
          </g>
        )}

        {/* Wind Speed Line - colored segments */}
        {data.length > 1 &&
          data.map((d, i) => {
            if (i === data.length - 1) return null;

            const nextPoint = data[i + 1];
            const segmentData = [d, nextPoint];
            const color = getDirectionColor(d.directionType);

            return (
              <LinePath
                key={`line-${i}`}
                data={segmentData}
                x={(d) => xScale(d.index)}
                y={(d) => yScale(d.speed)}
                stroke={color}
                strokeWidth={2}
                curve={curveNatural}
              />
            );
          })}

        {/* Wind Direction Arrows below graph, above x-axis labels - frequency scales with range */}
        {data.map((d, i) => {
          // Scale arrow frequency based on range
          let step;
          if (range <= 24) {
            step = 2; // Every 2 hours for 6h and 24h views
          } else if (range <= 72) {
            step = 6; // Every 6 hours for 3d view
          } else {
            step = 12; // Every 12 hours for 7d view
          }

          // Only show arrow at the specified interval
          if (i % step !== 0) return null;

          const cx = xScale(d.index);
          const cy = yMax + 10; // Position closer to graph, with space below for labels
          const rotation = getArrowRotation(d.direction);
          const arrowColor = getDirectionColor(d.directionType);

          return (
            <g key={`arrow-${i}`} transform={`translate(${cx}, ${cy})`}>
              {/* SVG arrow icon with rounded caps - bolder and shorter */}
              <g transform={`rotate(${rotation}) scale(0.6)`}>
                {/* Vertical line - shorter */}
                <line
                  x1="0"
                  y1="-5"
                  x2="0"
                  y2="5"
                  stroke={arrowColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Left diagonal */}
                <line
                  x1="0"
                  y1="-5"
                  x2="-3"
                  y2="0"
                  stroke={arrowColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Right diagonal */}
                <line
                  x1="0"
                  y1="-5"
                  x2="3"
                  y2="0"
                  stroke={arrowColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          );
        })}

        {/* Selected Time Indicator */}
        {increment > 0 && increment <= data.length && (
          <line
            x1={xScale(increment - 1) + 1}
            x2={xScale(increment - 1) + 1}
            y1={margin.top}
            y2={yMax}
            stroke={colors.accent}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            strokeOpacity={0.6}
          />
        )}
      </svg>
    </div>
  );
}
