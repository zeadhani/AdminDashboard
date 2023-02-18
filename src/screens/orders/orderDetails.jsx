import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useOrderDetails from "../../components/hooks/orders/useOrderDetails";
import CustomContainer from "../global/CustomContainer";
import { handleTitleClick } from "../../utils/functions";
import { useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import OrderInfo from "../../components/orders/orderInfo";
import OrderItems from "../../components/orders/orderItems";

function OrderDetails() {
  let { id } = useParams();
  const navigate = useNavigate();
  const { order } = useOrderDetails(id);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <CustomContainer
      title={"ORDERS DETAILS"}
      subtitle={"Viewing your bogo order!"}
      onClick={() => handleTitleClick(navigate, "Orders")}
    >
      <OrderInfo order={order} />
      <OrderItems colors={colors} orderItems={order?.orderItems} />
    </CustomContainer>
  );
}

export default OrderDetails;
