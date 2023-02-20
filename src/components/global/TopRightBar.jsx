import {
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext } from "../../Theme";
import { useProSidebar } from "react-pro-sidebar";
import SideBarActionButton from "./sidebar/sideBarActionButton";
import { useSelector } from "react-redux";

function TopRightBar(props) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { collapseSidebar, collapsed } = useProSidebar();
  const count = useSelector((state) => state.Count.count);
  // const matches = useMediaQuery("(max-width:600px)");

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
          <Badge
            badgeContent={count}
            color={"error"}
            showZero
            max={99}
            // variant={matches ? "dot":"standard"}
          >
            <NotificationsOutlined />
          </Badge>
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
