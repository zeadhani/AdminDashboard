import {
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { Badge, Box, IconButton, Tooltip, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext } from "../../Theme";
import { useProSidebar } from "react-pro-sidebar";
import SideBarActionButton from "./sidebar/sideBarActionButton";
import useMessage from "../hooks/contactus/useMessageCount";

function TopRightBar(props) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  // const { count } = useMessage();
  const { collapseSidebar, collapsed } = useProSidebar();

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
        <IconButton component={Link} to="/notifications">
          {/* <Badge badgeContent={count} color={"error"}> */}
            <NotificationsOutlined />
          {/* </Badge> */}
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
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <SideBarActionButton
          collapseSidebar={collapseSidebar}
          collapsed={collapsed}
        />
      </Box>
    </Box>
  );
}

export default TopRightBar;
