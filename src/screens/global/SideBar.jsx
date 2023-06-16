/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useState } from "react";
import { Sidebar, sidebarClasses } from "react-pro-sidebar";
import { Box, useTheme, Typography, Stack } from "@mui/material";
import { tokens } from "../../Theme";
import { useSelector } from "react-redux";
import SideBarActionButton from "../../components/global/sidebar/sideBarActionButton";
import useMessage from "../../components/hooks/contactus/useMessageCount";
import useUser from "../../components/hooks/auth/useUser";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SideBarItems from "../../components/global/sidebar/SideBarItems";

function SideBar({ collapseSidebar, collapsed }) {
  const isLoggedIn = useSelector((state) => state.Auth.loggedIn);
  const data = useSelector((state) => state.Auth.user);
  const email = data.replace(/"/g, "");
  const { user } = useUser(email);

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
                  <LazyLoadImage
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: "50%",
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                    alt={"Profile-Image"}
                    src={`${process.env.REACT_APP_CLOUDINARY}${user.image}`}
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

          <SideBarItems selected={selected} setSelected={setSelected} />
        </Sidebar>
      )}
    </>
  );
}

export default SideBar;
