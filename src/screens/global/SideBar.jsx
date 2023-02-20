/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { Box, useTheme, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../Theme";
import {
  HomeOutlined,
  CalendarMonthOutlined,
  Shop2Outlined,
} from "@mui/icons-material";

import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import { PeopleOutlined } from "@mui/icons-material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { useSelector } from "react-redux";
import SideBarActionButton from "../../components/global/sidebar/sideBarActionButton";
import useMessage from "../../components/hooks/contactus/useMessageCount";

const Item = ({ title, to, icon, selected, setSelected, disabled }) => {
  const handleClickMenuItem = (title) => {
    return () => {
      setSelected(title);
    };
  };
  return (
    <MenuItem
      active={selected === title}
      onClick={handleClickMenuItem(title)}
      icon={icon}
      disabled={disabled}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

function SideBar({ user, collapseSidebar, collapsed }) {
  const isLoggedIn = useSelector((state) => state.Auth.loggedIn);

  const [selected, setSelected] = useState(
    window.location.pathname.split("/")[1] === ""
      ? "Dashboard"
      : window.location.pathname.split("/")[1]
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useMessage();
  return (
    <>
      {isLoggedIn && (
        <Sidebar
          defaultCollapsed
          transitionDuration={100}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: colors.primary[600],
              height: "100vh",
              paddingBottom: "20px",
              zIndex: 300,
            },
          }}
        >
          <Box
            sx={{ display: { xs: "none", md: "flex" } }}
            justifyContent={collapsed ? "center" : "flex-end"}
            m={2}
          >
            <SideBarActionButton
              collapseSidebar={collapseSidebar}
              collapsed={collapsed}
            />
          </Box>
          {!collapsed && (
            <Stack mb={3} spacing={2}>
              {user?.image && (
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  sx={{ marginTop: { xs: "40px", md: "0px" } }}
                >
                  <img
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    alt={"Profile-Image"}
                    src={`${process.env.REACT_APP_DRIVE_URL}${user.image}`}
                  />
                </Box>
              )}
              <Box textAlign={"center"}>
                <Typography
                  variant={user?.first_name ? "h3" : "body2"}
                  textTransform={"capitalize"}
                  fontWeight={"bold"}
                  paddingY={!user?.first_name && 2}
                  color={
                    theme.palette.mode === "dark"
                      ? colors.primary[100]
                      : colors.grey[900]
                  }
                >
                  {user?.first_name
                    ? user?.first_name + " " + user?.last_name
                    : "Please Refresh the page Failed to Connect to the server"}
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
              to="/Orders"
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
      )}
    </>
  );
}

export default SideBar;
