import { Box } from "@mui/material";
import React from "react";
import PersonLine from "./PersonLine";
import { LazyLoadImage } from "react-lazy-load-image-component";

function PersonOrderDetails({ item }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row-reverse", sm: "row" },
      }}
    >
      <LazyLoadImage
        style={{
          height: 50,
          borderRadius: "50%",
          cursor: "pointer",
        }}
        alt={item?.Users.first_name}
        src={`${process.env.REACT_APP_DRIVE_URL}${item?.Users.image}`}
      />
      <Box
        sx={{
          display: { xs: "grid", sm: "flex" },
          justifyContent: { xs: "space-between", sm: "space-evenly" },
          width: "100%",
        }}
      >
        <Box>
          <PersonLine
            label={"name"}
            data={item?.Users.first_name + " " + item?.Users.last_name}
          />
          <PersonLine label={"Phone"} data={item?.Users.phone} />
        </Box>
        <Box>
          <PersonLine label={"Email"} data={item?.Users.email} />
          <PersonLine label={"Address"} data={item?.Users.address} />
        </Box>
      </Box>
    </Box>
  );
}

export default PersonOrderDetails;
