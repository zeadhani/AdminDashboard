import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/global/Header";
import TopRightBar from "../../components/global/TopRightBar";

function TopBar({ title, subtitle, onClick }) {
  return (
    <Box display={"flex"} justifyContent={"space-between"} pt={2}>
      <Box>
        <Header title={title} subtitle={subtitle} onClick={onClick} />
      </Box>
      <TopRightBar sx={{ transform: "translateY(-5px)" }} />
    </Box>
  );
}

export default TopBar;
