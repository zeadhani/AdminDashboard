import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomContainer from "../../global/CustomContainer";
import { handleTitleClick } from "../../../utils/functions";
import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import StateBox from "../../../components/global/stateBox";
import { tokens } from "../../../Theme";
import {
  MoneyOff,
  PeopleTwoTone,
  Shop2Outlined,
  ShoppingBag,
} from "@mui/icons-material";
import useBrandOffers from "../../../components/hooks/merchants/offers/useBrandOffers";

import OfferContainer from "../../../components/offers/offerContainer";
import axios from "axios";
import LinearProg from "../../../components/global/LinearProg";
import { toast } from "react-toastify";

function BrandOffers() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const { brandName } = state;
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const {
    offers,
    offersNumber,
    ordersNumber,
    requestsNumber,
    productsNumber,
    setNewOffers,
  } = useBrandOffers(id);
  const deletOffer = async (id) => {
    setLoading(true);
    try {
      const deleteItem = await axios.delete(
        `${process.env.REACT_APP_API_URL}/offer/${id}`
      );
      if (deleteItem.status === 200) {
        const newArray = [...offers];
        const resullt = newArray.filter((item) => item.id !== id);
        setNewOffers(resullt);
      }
    } catch (err) {
      toast(err.response.data.error);
    }
    setLoading(false);
  };
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
            gridColumn="span 3"
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
        <LinearProg loading={loading} />
        <OfferContainer
          offers={offers}
          colors={colors}
          deletOffer={deletOffer}
        />
      </Box>
    </CustomContainer>
  );
}

export default BrandOffers;
