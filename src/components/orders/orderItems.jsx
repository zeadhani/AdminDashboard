import React from "react";
import OrderItem from "./orderItem";
import { Box } from "@mui/material";

function OrderItems({ orderItems, colors }) {
  return (
    <Box display={"grid"} gap={2} mb={2}>
      {orderItems?.map((item) => (
        <OrderItem key={item?.id} item={item} colors={colors} />
      ))}
    </Box>
  );
}

export default OrderItems;
