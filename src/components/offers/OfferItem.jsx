import { Delete, Edit } from "@mui/icons-material";
import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";

function OfferItem({ offer, colors, deletOffer, showOfferItemDetails }) {
  const [hovered, setHovered] = useState(false);
  const handleHover = () => {
    setHovered((prev) => !prev);
  };

  return (
    <Box
      m={3}
      borderRadius={4}
      bgcolor={colors.blueAccent[400]}
      sx={{ cursor: "pointer" }}
      className="offerItem"
      textAlign={"center"}
      height={"120px"}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      position={"relative"}
      px={1}
    >
      <Box
        sx={{ opacity: hovered && 0.1 }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100%"}
        gap={0.5}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          {offer.name}
        </Typography>
        <Typography variant="h5">
          {offer.OfferRange.lowestPrice} - {offer.OfferRange.highestPrice} EGP
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            color: "text.secondary",
            "& hr": {
              mx: 1,
            },
          }}
        >
          <Typography variant="body1">
            {offer._count.requests} Requests
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ border: "1px solid" }}
          />
          <Typography variant="body1">
            {offer._count.products} products
          </Typography>
        </Box>
      </Box>
      {hovered && (
        <Box
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          sx={{ transform: "translateX(-50%) translateY(-50%)" }}
          display={"flex"}
          gap={2}
        >
          <Tooltip title="Edit Offer" placement="left">
            <IconButton
              sx={{ border: "1px solid " }}
              size="large"
              onClick={showOfferItemDetails(offer.id)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Offer" placement="right">
            <IconButton
              sx={{ border: "1px solid " }}
              size="large"
              onClick={deletOffer(offer.id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}

export default OfferItem;
