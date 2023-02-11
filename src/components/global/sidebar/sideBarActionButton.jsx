import { CloseOutlined, MenuOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { memo } from "react";

function SideBarActionButton({ collapsed, collapseSidebar }) {
  return (
    <IconButton onClick={() => collapseSidebar()}>
      {collapsed ? <MenuOutlined /> : <CloseOutlined />}
    </IconButton>
  );
}

export default memo(SideBarActionButton);
