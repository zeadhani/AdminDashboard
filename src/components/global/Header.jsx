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
        variant={"h2"}
        color={colors.grey[100]}
        sx={{
          mb: "5px",
          cursor: "pointer",
          // maxWidth: "400px",
          textTransform: "uppercase",
          fontSize: { xs: "22px", md: "32px" },
        }}
        {...props}
      >
        {title}
      </Typography>
      <Typography
        color={colors.grey[100]}
        textTransform={"uppercase"}
        sx={{ fontSize: { xs: "10px", md: "15px" } }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default Header;
