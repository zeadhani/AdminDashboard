import { Box } from "@mui/material";
import React from "react";
import OfferItem from "./OfferItem";

function OfferContainer({ offers, colors }) {
  return (
    <Box
      overflow={"scroll"}
      flex={1}
      backgroundColor={colors.primary[400]}
      display={"grid"}
      gridTemplateColumns={"1fr 1fr 1fr"}
      gridAutoRows="140px"
      rowGap="10px"
      sx={{
        borderRadius: "10px",
        height: "100%",
      }}
    >
      {offers?.map((item) => (
        <OfferItem key={item.name} offer={item} colors={colors} />
      ))}
    </Box>
  );
}

export default OfferContainer;
