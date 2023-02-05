import { Box } from "@mui/material";
import React from "react";
import { Add, RemoveRedEye } from "@mui/icons-material";
import { useState } from "react";
import OffersItems from "./offersItems";
import OfferDetails from "./OfferDetails";
import CustomFloatingButton from "../global/CustomFloatingButton";

function OfferContainer({
  offers,
  colors,
  deletOffer,
  offerRange,
  brandName,
  offerType,
  addOffer
}) {
  const [showOffers, setshowOffers] = useState(true);
  const [offerId, setOfferId] = useState("");
  const showOfferItemDetails = (id) => {
    return (e) => {
      setOfferId(id);
      setshowOffers(!showOffers);
    };
  };
  const handleClick = () => {
    setOfferId("");
    setshowOffers(!showOffers);
  };

  return (
    <Box
      position={"relative"}
      flex={1}
      backgroundColor={colors.primary[400]}
      sx={{
        borderRadius: "10px",
        height: "100%",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      {!showOffers && (
        <OfferDetails
          showOffers={showOffers}
          offerType={offerType}
          offerRange={offerRange}
          offerId={offerId}
          brandName={brandName}
          addOffer={addOffer}
        />
      )}

      {showOffers && (
        <OffersItems
          offers={offers}
          colors={colors}
          deletOffer={deletOffer}
          showOffers={showOffers}
          showOfferItemDetails={showOfferItemDetails}
        />
      )}

      <CustomFloatingButton
        colors={colors}
        handleClick={handleClick}
        showOffers={showOffers}
      >
        {showOffers ? <Add /> : <RemoveRedEye />}
      </CustomFloatingButton>
    </Box>
  );
}

export default OfferContainer;
