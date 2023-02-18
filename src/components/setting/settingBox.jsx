import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../Theme";

function SettingBox({ label, handleClick, ...rest }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      gridTemplateAreas={"12 span"}
      onClick={handleClick}
      sx={{
        bgcolor:
          theme.palette.mode === "dark" ? colors.blueAccent[700] : "#1f2a40",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        cursor: "pointer",
      }}
      {...rest}
    >
      <Typography
        textTransform={"uppercase"}
        sx={{
          transform: "translateY(-50%)",
          fontSize: { xs: "22px", md: "32px" },
        }}
      >
        {label} &rarr;
      </Typography>
    </Box>
  );
}

export default SettingBox;
