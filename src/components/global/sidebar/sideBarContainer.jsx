import { Box } from "@mui/material";
import React from "react";
import SideBar from "../../../screens/global/SideBar";
import { useProSidebar } from "react-pro-sidebar";


function SideBarContainer() {
  const { collapseSidebar, collapsed } = useProSidebar();

  return (
    <Box
      className="sidebar"
      sx={{
        position: { xs: "absolute", md: "relative" },
        display: { xs: collapsed && "none", md: "block" },
      }}
    >
      <SideBar collapseSidebar={collapseSidebar} collapsed={collapsed} />
    </Box>
  );
}

export default SideBarContainer;
