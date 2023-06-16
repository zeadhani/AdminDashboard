import { Typography, useTheme } from "@mui/material";
import React from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { tokens } from "../../../Theme";
import {
  HomeOutlined,
  CalendarMonthOutlined,
  Shop2Outlined,
  Diversity3Outlined,
  FavoriteBorderOutlined,
  CategoryOutlined,
  TypeSpecimenOutlined,
  LocalOfferOutlined,
  AttachMoneyOutlined,
  PeopleOutlined,
  MoneyTwoTone,
} from "@mui/icons-material";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
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
function SideBarItems({ selected, setSelected }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
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
        title="Categories"
        to="/Categories"
        icon={<CategoryOutlined />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Attributes"
        to="/Attributes"
        icon={<TypeSpecimenOutlined />}
        selected={selected}
        setSelected={setSelected}
      />

      <Item
        title="Offer Ranges"
        to="/OfferRanges"
        icon={<AttachMoneyOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Offer Types"
        to="/OfferTypes"
        icon={<LocalOfferOutlined />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Preferences"
        to="/Preferences"
        icon={<FavoriteBorderOutlined />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Requests"
        to="/Requests"
        icon={<Diversity3Outlined />}
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
      {/* <Item
        title="Expenses"
        to="/Expenses"
        icon={<MoneyTwoTone />}
        selected={selected}
        setSelected={setSelected}
      /> */}
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
  );
}

export default SideBarItems;
