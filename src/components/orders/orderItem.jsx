import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import PersonOrderDetails from "./orderItem/personOrderDetails";
import OrderDetailsProduct from "./orderItem/orderDetailsProduct";

function OrderItem({ colors, item }) {
  console.log(item);
  return (
    <Box sx={{ backgroundColor: colors.primary[400], p: "20px" }}>
      <PersonOrderDetails item={item} />
      <Divider sx={{ my: 2 }} />
      <OrderDetailsProduct item={item} />
    </Box>
  );
}

export default OrderItem;
