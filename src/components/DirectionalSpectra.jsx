import { Group } from "@visx/group";
import { LineRadial } from "@visx/shape";
import { scaleTime, scaleLog } from "@visx/scale";
import { curveBasisOpen } from "@visx/curve";
import appleStock, { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { LinearGradient } from "@visx/gradient";
import { AxisLeft } from "@visx/axis";
import { GridRadial, GridAngle } from "@visx/grid";
import { extent } from "d3-array";
import { scaleLinear } from "@visx/vendor/d3-scale";

export default function DirectionalSpectra({ directions, densities }) {
  const green = "#e5fd3d";
  const blue = "#7EB9D4";
  const white = "#D9D9D9"
  const darkgreen = "#dff84d";
  const background = "#744cca";
  const darkbackground = "#603FA8";
  const strokeColor = "#744cca";

  const width = 400;
  const height = 400;
  const padding = 30;

  const xScale = scaleTime({
    range: [0, Math.PI * 2],
    domain: [0, 20],
  });
  const yScale = scaleLinear({
    domain: [0.001, 1],
  });

  yScale.range([0, height / 2 - padding]);
  const reverseYScale = yScale.copy().range(yScale.range().reverse());
  const handlePress = () => setShouldAnimate(true);

  return (
    <svg width={width} height={height}>
      <LinearGradient id="line-gradient" from={blue} to={blue} />
      <Group top={height / 2} left={width / 2}>
        <GridAngle
          scale={xScale}
          outerRadius={height / 2 - padding}
          stroke={white}
          strokeWidth={1}
          strokeOpacity={0.3}
          strokeDasharray="1,2"
          numTicks={8}
        />

        <GridRadial
          scale={yScale}
          numTicks={5}
          stroke={blue}
          strokeWidth={1}
          fill={blue}
          fillOpacity={0.1}
          strokeOpacity={0.2}
        />
        <AxisLeft
          top={-height / 2 + padding}
          scale={reverseYScale}
          numTicks={5}
          tickStroke="none"
          tickLabelProps={{
            fontSize: 8,
            fill: white,
            fillOpacity: 1,
            textAnchor: "middle",
            dx: "1em",
            dy: "-0.5em",
            // stroke: strokeColor,
            // strokeWidth: 0.5,
            // paintOrder: "stroke",
          }}
          
          hideAxisLine
        />
      </Group>
    </svg>
  );
}
