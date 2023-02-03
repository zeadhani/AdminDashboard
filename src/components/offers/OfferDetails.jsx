import { Box, Button, Slide } from "@mui/material";
import React from "react";

function OfferDetails({ showOffers }) {
  return (
    <Box height={"100%"}>
      <Slide in={!showOffers} direction="left" timeout={300}>
        <Box variant="contained" color="error">
          <Button variant="contained" color="error">
            zzz
          </Button>
        </Box>
      </Slide>
    </Box>
  );
}

export default OfferDetails;
