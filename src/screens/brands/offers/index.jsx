import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomContainer from "../../global/CustomContainer";
import { handleTitleClick } from "../../../utils/functions";
import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import StateBox from "../../../components/global/stateBox";
import { tokens } from "../../../Theme";
import { MoneyOff, PeopleTwoTone, ShoppingBag } from "@mui/icons-material";
import useBrandOffers from "../../../components/hooks/merchants/offers/useBrandOffers";
import OfferItem from "../../../components/offers/OfferItem";
import OfferContainer from "../../../components/offers/offerContainer";

function BrandOffers() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { brandName } = state;
  const { id } = useParams();
  const { offers, offersNumber, ordersNumber, requestsNumber } =
    useBrandOffers(id);

  return (
    <CustomContainer
      title={brandName}
      subtitle={`managing ${brandName} offers`}
      onClick={() => handleTitleClick(navigate, `Merchants/${id}`)}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        height={"85vh"}
        overflow={"hidden"}
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          py={3}
        >
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StateBox
              title={requestsNumber}
              subtitle="Total Requests Submitted"
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
            gridColumn="span 4"
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
            gridColumn="span 4"
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
        </Box>

        <OfferContainer offers={offers} colors={colors} />
      </Box>
    </CustomContainer>
  );
}

export default BrandOffers;
