import { Box, Typography } from "@mui/material";
import React from "react";
import PieChart from "../../../charts/PieChart";

function PieChartStats({ colors,data }) {
  return (
    <Box
      sx={{ gridColumn: { lg: "span 4", xs: "span 3" } }}
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      padding="30px"
    >
      <Box display={"flex"} gap={1}>
        <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
          Top Five Brands
        </Typography>
        <Typography
          variant="body2"
          fontWeight="100"
          sx={{ transform: "translateY(3px)" }}
          color={"grey"}
        >
          -Products
        </Typography>
      </Box>
      <Box height="200px">
        <PieChart data={data}/>
      </Box>
    </Box>
  );
}

export default PieChartStats;
