import { Fab, Tooltip } from "@mui/material";
import React from "react";

function CustomFloatingButton({ colors, handleClick, children, showOffers }) {
  return (
    <Tooltip
      title={showOffers ? "Add Offer" : "view Offers"}
      placement="left-start"
    >
      <Fab
        color="primary"
        onClick={handleClick}
        aria-label="add"
        sx={{
          position: { xs: "fixed", md: "absolute" },
          bottom: "20px",
          right: "25px",
          bgcolor: colors.greenAccent[500],
          color: colors.grey[100],
          boxShadow: "none",
          "&:hover": {
            bgcolor: colors.greenAccent[700],
          },
        }}
      >
        {children}
      </Fab>
    </Tooltip>
  );
}

export default CustomFloatingButton;
