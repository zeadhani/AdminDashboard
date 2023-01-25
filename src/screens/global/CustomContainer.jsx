import { Box } from "@mui/material";
import React from "react";
import TopBar from "./TopBar";

function CustomContainer({ title, subtitle, onClick, children }) {
  return (
    <Box mx="20px">
      <TopBar title={title} subtitle={subtitle} onClick={onClick} />
      {children}
    </Box>
  );
}

export default CustomContainer;

