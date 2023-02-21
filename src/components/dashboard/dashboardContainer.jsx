import { Box } from "@mui/material";
import React from "react";
import DashboardStats from "./dashboardData/dashboardStats";

function DashboardContainer({ colors }) {
  return (
    <Box
      display="grid"
      sx={{
        gridTemplateColumns: {
          lg: "repeat(12, 1fr)",
          sm: "repeat(6, 1fr)",
          xs: "repeat(3, 1fr)",
        },
      }}
      gridAutoRows="140px"
      gap="20px"
    >
      <DashboardStats colors={colors} />
    </Box>
  );
}

export default DashboardContainer;
