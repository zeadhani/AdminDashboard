import { Box, Typography } from "@mui/material";
import React from "react";
import BarChart from "../../../charts/BarChart";

function BarChartStats({ colors ,data}) {
  const transformedData = data.map((item, index) => ({
    id: item.name,
    name: item.name,
    value: item._count.offers,
  }));
  return (
    <Box
      sx={{ gridColumn: { lg: "span 4", sm: "span 6", xs: "span 3" } }}
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
    >
      <Box display={"flex"} gap={1} sx={{ padding: "30px 30px 0 30px" }}>
        <Typography variant="h5" fontWeight="600">
          Top Five Brands
        </Typography>
        <Typography
          variant="body2"
          fontWeight="100"
          sx={{ transform: "translateY(3px)" }}
          color={"grey"}
        >
          -Offers
        </Typography>
      </Box>
      <Box height="250px" mt="-20px">
        <BarChart data={transformedData} />
      </Box>
    </Box>
  );
}

export default BarChartStats;
