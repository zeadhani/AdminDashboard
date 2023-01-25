import {
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext } from "../../Theme";

function TopRightBar(props) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-end"}
      alignSelf={"flex-start"}
      {...props}
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
  );
}

export default TopRightBar;
