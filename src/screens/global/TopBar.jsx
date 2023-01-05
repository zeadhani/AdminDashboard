import React from "react";
import { useContext } from "react";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { ColorModeContext } from "../../Theme";
import { LightModeOutlined } from "@mui/icons-material";
import { DarkModeOutlined } from "@mui/icons-material";
import { NotificationsOutlined } from "@mui/icons-material";
import { SettingsOutlined } from "@mui/icons-material";
import { PersonOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Header from "../../components/global/Header";

function TopBar({ title, subtitle, onClick }) {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box display={"flex"} justifyContent={"space-between"} pt={2}>
      <Box>
        <Header title={title} subtitle={subtitle} onClick={onClick} />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        alignSelf={"flex-start"}
      >
        <Tooltip title={theme.palette.mode === "dark" ? "Light" : "Dark"}>
          <IconButton onClick={() => colorMode.toggleColorMode()}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined />
            ) : (
              <DarkModeOutlined />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton component={Link} to="/logs">
            <NotificationsOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton component={Link} to="/setting">
            <SettingsOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Profile">
          <IconButton component={Link} to="/profile">
            <PersonOutlined />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default TopBar;
{
  /* <Typography variant="h3" fontWeight={"bold"} letterSpacing={2} sx={{cursor:"pointer"}}>
  LOGO
</Typography> */
}
