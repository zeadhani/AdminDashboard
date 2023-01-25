import { useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import React from "react";
import { mockPieData as data } from "../../data/mockData";
import { tokens } from "../../Theme";

function PieChart() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsivePie
      data={data}
      theme={{
        tooltip: { basic: { color: "black" } },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
      }}
      margin={{ top: 20 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", "1.7"]],
      }}
      defs={[
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 1,
        },
      ]}
      
    />
  );
}

export default PieChart;
