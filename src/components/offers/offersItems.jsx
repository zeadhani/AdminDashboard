import { Box, Slide, Typography } from "@mui/material";
import React from "react";
import OfferItem from "./OfferItem";
import { Add } from "@mui/icons-material";

function OffersItems({
  offers,
  colors,
  deletOffer,
  showOffers,
  showOfferItemDetails,
}) {
  return (
    <Box height={"100%"}>
      <Slide in={showOffers} direction="left">
        <Box
          display={offers.length === 0 ? "flex" : "grid"}
          alignItems={"center"}
          justifyContent={"center"}
          gridTemplateColumns={"1fr 1fr 1fr"}
          gridAutoRows={"140px"}
          rowGap={"10px"}
          height={"100%"}
        >
          {offers.length > 0 &&
            offers?.map((item) => (
              <OfferItem
                key={item.name}
                offer={item}
                colors={colors}
                deletOffer={deletOffer}
                showOfferItemDetails={showOfferItemDetails}
              />
            ))}
          {offers.length === 0 && (
            <Typography variant="h1" textTransform={"capitalize"}>
              No Offers click the <Add /> To add some Offers
            </Typography>
          )}
        </Box>
      </Slide>
    </Box>
  );
}

export default OffersItems;
