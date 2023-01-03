import React, { useContext } from "react";
import { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
} from "react-pro-sidebar";
import {
  Box,
  useTheme,
  IconButton,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../../Theme";
import {
  HomeOutlined,
  CalendarMonthOutlined,
  MenuOutlined,
  Shop2Outlined,
} from "@mui/icons-material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import { PeopleOutlined } from "@mui/icons-material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

const Item = ({ title, to, icon, selected, setSelected, disabled }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      disabled={disabled}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

function SideBar() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [selected, setSelected] = useState(
    window.location.pathname.split("/")[1] === ""
      ? "Dashboard"
      : window.location.pathname.split("/")[1]
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Sidebar
      transitionDuration={100}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: colors.primary[600],
          height:"100vh",
          paddingBottom:"20px",
        },
      }}
    >
      <Box
        display={"flex"}
        justifyContent={collapsed ? "center" : "flex-end"}
        m={2}
      >
        <IconButton
          onClick={() => collapseSidebar()}
          color={theme.palette.mode === "dark" ? colors.grey[100] : "neutral"}
        >
          {collapsed ? <MenuOutlined /> : <CloseOutlinedIcon />}
        </IconButton>
      </Box>
      {!collapsed && (
        <Stack mb={3} spacing={2}>
          <Box display={"flex"} justifyContent={"center"}>
            <Avatar sx={{ height: 100, width: 100 }} alt={"Profile-Image"} />
            {/* <img
              style={{
                height: 100,
                width: 100,
                borderRadius: "50%",
                cursor: "pointer",
              }}
              alt={"Profile-Image"}
            /> */}
          </Box>
          <Box textAlign={"center"}>
            <Typography
              variant="h3"
              fontWeight={"bold"}
              color={
                theme.palette.mode === "dark"
                  ? colors.primary[100]
                  : colors.grey[900]
              }
            >
              Zead Hani
            </Typography>
            <Typography variant="h5" color={colors.blueAccent[500]}>
              Admin
            </Typography>
          </Box>
        </Stack>
      )}
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            if (level === 0)
              return {
                padding: "5px 35px 5px 20px",
                color: disabled
                  ? colors.grey[500]
                  : active
                  ? theme.palette.mode === "dark"
                    ? colors.grey[100]
                    : colors.primary[600]
                  : theme.palette.mode === "dark"
                  ? colors.grey[100]
                  : colors.primary[400],
                backgroundColor: active
                  ? theme.palette.mode === "dark"
                    ? colors.blueAccent[600]
                    : colors.grey[900]
                  : undefined,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? colors.primary[400]
                      : colors.grey[800],
                  color:
                    theme.palette.mode === "dark"
                      ? colors.grey[100]
                      : colors.primary[600],
                },
              };
          },
        }}
      >
        <Item
          title="Dashboard"
          to="/"
          icon={<HomeOutlined />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Team"
          to="/Team"
          icon={<Diversity3OutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Products"
          to="/Products"
          icon={<Shop2Outlined />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Merchants"
          to="/Merchants"
          icon={<PeopleOutlined />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Offers"
          to="/offers"
          icon={<LocalOfferOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Users"
          to="/Users"
          icon={<EmojiPeopleOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />

        <Item
          title="Orders"
          to="/orders"
          icon={<ShoppingBagOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="profit"
          to="/balance"
          icon={<AttachMoneyOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Home Slider"
          to="/home-slider"
          icon={<ViewCarouselOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Calender"
          to="/Calender"
          disabled
          icon={<CalendarMonthOutlined />}
          selected={selected}
          setSelected={setSelected}
        />
      </Menu>
    </Sidebar>
  );
}

export default SideBar;
