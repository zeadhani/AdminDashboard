import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Header from "../global/Header";
import { DownloadOutlined } from "@mui/icons-material";
import TopRightBar from "../global/TopRightBar";

function DashboardHeader({colors}) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard!" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "12px",
            fontWeight: "bold",
            padding: "10px 20px",
            display: { xs: "none", md: "block" },
          }}
        >
          <DownloadOutlined sx={{ mr: "10px", transform: "translateY(5px)" }} />
          <Typography display={"inline"} variant="body1">
            Download CSV
          </Typography>
        </Button>
        <TopRightBar sx={{ alignSelf: "flex-end" }} />
      </Box>
    </Box>
  );
}

export default DashboardHeader;
