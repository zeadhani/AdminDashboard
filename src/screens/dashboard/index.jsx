import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import DashboardHeader from "../../components/dashboard/dashboardHeader";
import DashboardContainer from "../../components/dashboard/dashboardContainer";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mx="20px" my={"15px"}>
      <DashboardHeader colors={colors} />
      <DashboardContainer colors={colors} />
    </Box>
  );
}

export default Dashboard;
