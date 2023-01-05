import { Box } from "@mui/material";
import React from "react";
import Header from "../../components/global/Header";

function Dashboard() {
  return (
    <Box mx="20px">
      <Header title={"DASHBOARD"} subtitle={"Welcome to your dashboard!"} />
    </Box>
  );
}

export default Dashboard;
