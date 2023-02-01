import { Box, Fab, Tooltip, Typography } from "@mui/material";
import React from "react";
import OfferItem from "./OfferItem";
import { Add } from "@mui/icons-material";

function OfferContainer({ offers, colors }) {
  return (
    <Box
      overflow={"scroll"}
      position={"relative"}
      flex={1}
      backgroundColor={colors.primary[400]}
      display={offers.length > 0 ? "grid" : "flex"}
      alignItems={"center"}
      justifyContent={"center"}
      gridTemplateColumns={"1fr 1fr 1fr"}
      gridAutoRows="140px"
      rowGap="10px"
      sx={{
        borderRadius: "10px",
        height: "100%",
      }}
    >
      <Tooltip title="Add" placement="left-start">
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: "absolute",
            bottom: "0px",
            right: "10px",
            bgcolor: colors.greenAccent[500],
            color: colors.grey[100],
            boxShadow: "none",
            "&:hover": {
              bgcolor: colors.greenAccent[700],
            },
          }}
        >
          <Add />
        </Fab>
      </Tooltip>

      {offers.length > 0 &&
        offers?.map((item) => (
          <OfferItem key={item.name} offer={item} colors={colors}  />
        ))}
      {offers.length === 0 && (
        <Typography variant="h1" textTransform={"capitalize"}>
          No Offers click the <Add /> To add some Offers
        </Typography>
      )}
    </Box>
  );
}

export default OfferContainer;
