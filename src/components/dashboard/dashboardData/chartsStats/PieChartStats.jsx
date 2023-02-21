import { Box, Typography } from "@mui/material";
import React from "react";
import PieChart from "../../../charts/PieChart";

function PieChartStats({ colors }) {
  return (
    <Box
      sx={{ gridColumn: { lg: "span 4", xs: "span 3" } }}
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      padding="30px"
    >
      <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
        Top Five Brands
      </Typography>
      <Box height="200px">
        <PieChart />
      </Box>
    </Box>
  );
}

export default PieChartStats;
