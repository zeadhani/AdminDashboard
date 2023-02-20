import { Box, Button, useMediaQuery } from "@mui/material";
import React from "react";

function FormButton({ theme, children }) {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <Box display="flex" justifyContent="end">
      <Button
        type="submit"
        variant="outlined"
        color={theme.palette.mode === "dark" ? "secondary" : "primary"}
        size={matches ? "medium" : "large"}
      >
        {children}
      </Button>
    </Box>
  );
}

export default FormButton;
