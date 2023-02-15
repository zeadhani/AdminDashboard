import { Box } from "@mui/material";
import React from "react";
import SideBar from "../../../screens/global/SideBar";
import { useProSidebar } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import useUser from "../../hooks/auth/useUser";
function SideBarContainer() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const data = useSelector((state) => state.Auth.user);
  const email = data.replace(/"/g, "");
  const { user } = useUser(email);
  return (
    <Box
      className="sidebar"
      sx={{
        position: { xs: "absolute", md: "relative" },
        display: { xs: collapsed && "none", md: "block" },
      }}
    >
      <SideBar
        user={user}
        collapseSidebar={collapseSidebar}
        collapsed={collapsed}
      />
    </Box>
  );
}

export default SideBarContainer;
