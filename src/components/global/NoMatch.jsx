import { Box, Typography } from "@mui/material";
import React from "react";

function NoMatch() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3">404 - Page not found</Typography>
      <Typography variant="subtitle1">
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
}

export default NoMatch;
