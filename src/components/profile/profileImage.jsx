import { Box } from "@mui/material";
import React from "react";

function ProfileImage({user}) {
  return (
    <Box
      sx={{
        borderRight: { xs: "none", md: "1px solid" },
        pr: 5,
        pb: 5,
      }}
    >
      <img
        style={{
          height: 140,
          borderRadius: "50%",
          cursor: "pointer",
          width: 140,
        }}
        alt={user?.first_name}
        src={`${process.env.REACT_APP_DRIVE_URL}${user?.image}`}
      />
    </Box>
  );
}

export default ProfileImage;
