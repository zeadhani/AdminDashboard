import { Box } from "@mui/material";
import React from "react";

function TopStatsContainer({ colors, children }) {
  return (
    <Box
      gridColumn="span 3"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  );
}

export default TopStatsContainer;
