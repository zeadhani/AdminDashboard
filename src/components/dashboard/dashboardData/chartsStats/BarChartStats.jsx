import { Box, Typography } from "@mui/material";
import React from "react";
import BarChart from "../../../charts/BarChart";

function BarChartStats({ colors }) {
  return (
    <Box
      sx={{ gridColumn: { lg: "span 4", sm: "span 6", xs: "span 3" } }}
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
    >
      <Typography
        variant="h5"
        fontWeight="600"
        sx={{ padding: "30px 30px 0 30px" }}
      >
        Requests In Last six Months
      </Typography>
      <Box height="250px" mt="-20px">
        <BarChart />
      </Box>
    </Box>
  );
}

export default BarChartStats;
