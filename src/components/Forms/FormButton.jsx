import { Box, Button } from "@mui/material";
import React from "react";

function FormButton({ theme, children }) {
  return (
    <Box display="flex" justifyContent="end">
      <Button
        type="submit"
        variant="outlined"
        color={theme.palette.mode === "dark" ? "secondary" : "primary"}
        size={"large"}
      >
        {children}
      </Button>
    </Box>
  );
}

export default FormButton;
