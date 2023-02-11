import { Box } from "@mui/material";
import React from "react";
import StateBox from "../global/stateBox";
import {
  MoneyOff,
  PeopleTwoTone,
  Shop2Outlined,
  ShoppingBag,
} from "@mui/icons-material";

function OffersDataGrid({
  colors,
  requestsNumber,
  offersNumber,
  ordersNumber,
  productsNumber,
}) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px"
      py={3}
    >
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StateBox
          title={requestsNumber}
          subtitle="Total Requests"
          progress="0.25"
          increase="+12%"
          icon={
            <PeopleTwoTone
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StateBox
          title={offersNumber}
          subtitle="Total Offers"
          progress="0.25"
          increase="+12%"
          icon={
            <MoneyOff
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StateBox
          title={ordersNumber}
          subtitle="Total Orders"
          progress="0.25"
          increase="+12%"
          icon={
            <ShoppingBag
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StateBox
          title={productsNumber}
          subtitle="Total Products"
          progress="0.25"
          increase="+12%"
          icon={
            <Shop2Outlined
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
    </Box>
  );
}

export default OffersDataGrid;
