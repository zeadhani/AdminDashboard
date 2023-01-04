import { Box } from "@mui/material";
import React from "react";
import Header from "../../components/Header";

function CustomContainer({ title, subtitle, onClick, children }) {
  return (
    <Box mx="20px">
      <Header title={title} subtitle={subtitle} onClick={onClick} />
      {children}
    </Box>
  );
}

export default CustomContainer;
