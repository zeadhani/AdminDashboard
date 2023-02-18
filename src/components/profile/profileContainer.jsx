import { Box } from "@mui/material";
import React from "react";

function ProfileContainer({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { md: 5 },
        py: 4,
        px: 2,
      }}
    >
      {children}
    </Box>
  );
}

export default ProfileContainer;
