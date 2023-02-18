import { Box, Typography } from "@mui/material";
import React from "react";

function PersonLine({ label, data }) {
  return (
    <Box display={"flex"} gap={1}>
      <Typography variant="h6" textTransform={"capitalize"} fontWeight={"bold"}>
        {label} &#10072;
      </Typography>

      <Typography variant="h6" textTransform={"capitalize"}>
        {data}
      </Typography>
    </Box>
  );
}

export default PersonLine;
