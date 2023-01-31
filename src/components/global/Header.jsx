import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../Theme";

function Header(props) {
  const { title, subtitle } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        sx={{
          mb: "5px",
          cursor: "pointer",
          maxWidth: "300px",
          textTransform: "uppercase",
        }}
        {...props}
      >
        {title}
      </Typography>
      <Typography color={colors.grey[100]} textTransform={"uppercase"}>
        {subtitle}
      </Typography>
    </Box>
  );
}

export default Header;
