import { Box, Typography } from "@mui/material";
import React from "react";

function OfferItem({ offer, colors }) {
  return (
    <Box
      m={3}
      px={4}
      py={2}
      borderRadius={4}
      bgcolor={colors.blueAccent[400]}
      sx={{ cursor: "pointer" }}
      className="offerItem"
      textAlign={"center"}
      height={"120px"}
    >
      <Typography variant="h4" fontWeight={"bold"} sx={{ marginBottom: "5px" }}>
        {offer.name}
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: "5px" }}>
        {offer.OfferRange.lowestPrice} - {offer.OfferRange.highestPrice} EGP
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "5px" }}>
        {offer._count.requests} Requests
      </Typography>
    </Box>
  );
}

export default OfferItem;
