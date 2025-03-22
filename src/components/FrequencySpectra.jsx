import { Axis } from "@visx/axis";
import { curveNatural } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { MarkerCircle } from "@visx/marker";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { Text } from "@visx/text";
import { Grid } from "@visx/grid";
import { format } from "@visx/vendor/d3-format";

export default function FrequencySpectra({ frequencies, densities }) {
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

  const data = [];
  for (let i = 0; i < frequencies.length; i++) {
    data.push([1.0 / frequencies[i], densities[i]]);
  }

  const maxX = Math.max(...data.map((item) => item[0]));
  const maxY = Math.max(...data.map((item) => item[1]));

  const xScale = scaleLinear({
    range: [margin.left, xMax],
    domain: [0, 20],
  });

  const yScale = scaleLinear({
    range: [yMax, margin.top],
    domain: [0, Math.ceil(maxY / 0.5) * 0.5],
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
    <svg height={height} width={width}>
      {/* Rectangle */}
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
      <Grid
        xScale={xScale}
        yScale={yScale}
        width={xMax}
        height={yMax}
        numTicksRows={maxY / 0.5 + 1}
        numTicksColumns={8}
        top={0}
        left={margin.left}
        stroke={colors.darkGray}
      />
      {/* X Axis */}
      <Axis
        scale={xScale}
        top={height - margin.bottom}
        orientation="bottom"
        stroke={colors.darkGray}
        strokeWidth={1.5}
        // tickStroke={colors.darkGray}
        tickLabelProps={() => ({
          fill: colors.gray,
          textAnchor: "middle",
          verticalAnchor: "middle",
        })}
      />

      {/* Y Axis */}
      <Axis
        hideZero
        scale={yScale}
        numTicks={maxY / 0.5 + 1}
        left={margin.left}
        orientation="left"
        stroke={colors.darkGray}
        strokeWidth={1.5}
        // tickStroke={colors.darkGray}
        tickLabelProps={() => ({
          fill: colors.gray,
          textAnchor: "end",
          verticalAnchor: "middle",
        })}
        tickFormat={(value) => `${value}`}
      />

      {/* Gradient for actual line */}
      <LinearGradient
        id="line-gradient"
        from={colors.accent}
        to={colors.darkAccent}
      />
      {/* <MarkerCircle id="marker-circle" fill={colors.gray} size={1.5} refX={2} /> */}

      {/* Background effect */}
      <LinearGradient
        id="background-gradient"
        from={colors.darkAccent}
        to={colors.black}
      />
      <LinePath
        data={data.slice(4)}
        x={(d) => xScale(d[0])}
        y={(d) => yScale(d[1])}
        fill="url('#background-gradient')"
        curve={curveNatural}
      />

      {/* Actual Line */}
      <LinePath
        data={data.slice(4)}
        x={(d) => xScale(d[0])}
        y={(d) => yScale(d[1])}
        stroke="url('#line-gradient')"
        strokeWidth={2.5}
        curve={curveNatural}
        markerEnd="url(#marker-circle)"
      />

      {/* Title */}
      {/* <Text
        style={{
          fill: colors.white,
          fontSize: 24,
          fontWeight: 600,
        }}
        x={padding / 2}
        y={padding}
      >
        Frequency Spectra
      </Text> */}

      {/* X Axis title */}
      {/* <Text
        angle={-90}
        style={{
          fill: colors.gray,
          fontSize: 11,
          fontWeight: 400,
        }}
        x={20}
        y={height / 2 + 20}
      >
        m2 / Hz
      </Text> */}
      <foreignObject
        x={-110}
        y={height / 2 - 100}
        width="50"
        height="20"
        transform="rotate(-90)"
        style={{overflow: 'visible'}}
      >
        {/* <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            fontSize: "11px",
            color: colors.gray,
            whiteSpace: 'nowrap',
          }}
        >
          m<sup>2</sup> / Hz
        </div> */}
      </foreignObject>

      {/* Y Axis title */}
      {/* <Text
        style={{
          fill: colors.gray,
          fontSize: 11,
          fontWeight: 400,
        }}
        x={width/2-20}
        y={height-1}
      >
        Period (sec)
      </Text> */}
    </svg>
  );
}
