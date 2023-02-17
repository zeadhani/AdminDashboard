import { Box } from "@mui/material";
import React from "react";

function OrderItem({ colors, item }) {
  return (
    <Box sx={{ backgroundColor: colors.primary[400], padding: "20px" }}>
      {item?.id}
    </Box>
  );
} 

export default OrderItem;
