import React from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../Theme";

function BarChart({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const transformedData = data.map((item, index) => ({
    id: item.name,
    name: item.name,
    value: item._count.offers,
  }));

  return (
    <ResponsiveBar
      data={transformedData}
      theme={{
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
        tooltip: { basic: { color: "black" } },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      indexBy={"name"}
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme:"set3" }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 45,
        legend: undefined,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: undefined,
        legendPosition: "middle",
        legendOffset: -40,
      }}
      // enableGridY={false}
      labelSkipWidth={5}
      labelSkipHeight={12}
      enableLabel={false}
      role="application"
      ariaLabel="Nivo bar chart demo"
    />
  );
}

export default BarChart;
