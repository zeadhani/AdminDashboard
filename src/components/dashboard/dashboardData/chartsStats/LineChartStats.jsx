import { Box, Typography } from "@mui/material";
import React from "react";

import BarChart from "../../../charts/BarChart";

function LineChartStats({colors,data}) {
  const transformedData = data.map((item, index) => ({
    id: item.Brands.name,
    name: item.Brands.name,
    value: item._count.requests,
  }));
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
          Top brands
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          color={colors.greenAccent[500]}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
         Requests
        </Typography>
      </Box>
      <Box height="250px" m="-20px 0 0 0">
      <BarChart data={transformedData} layout="horizontal" />
      </Box>
    </Box>
  );
}

export default LineChartStats;
