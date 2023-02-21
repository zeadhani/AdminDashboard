import { Box, Typography } from "@mui/material";
import React from "react";
import LineChart from "../../../charts/LineChart";

function LineChartStats({colors}) {
  return (
    <Box
      sx={{
        gridColumn: { lg: "span 8", sm: "span 6", xs: "span 3" },
      }}
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
    >
      <Box
        mt="25px"
        p="0 30px"
        display="flex "
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h5"
          fontWeight="600"
          color={colors.blueAccent[500]}
        >
          Revenue Generated
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          color={colors.greenAccent[500]}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          59,342.32 EGP
        </Typography>
      </Box>
      <Box height="250px" m="-20px 0 0 0">
        <LineChart />
      </Box>
    </Box>
  );
}

export default LineChartStats;
