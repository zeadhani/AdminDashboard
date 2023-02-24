import { Box, Typography } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function PersonLine({ label, data, image }) {
  return (
    <Box display={!image && "flex"} gap={1}>
      <Typography variant="h6" textTransform={"capitalize"} fontWeight={"bold"}>
        {label} {!image && <>&#10072;</>}
      </Typography>

      {!image && (
        <Typography variant="h6" textTransform={"capitalize"}>
          {data}
        </Typography>
      )}
      {image && (
        <LazyLoadImage
          style={{
            width: 100,
            borderRadius: "10%",
            cursor: "pointer",
            marginTop: "20px",
          }}
          alt={data}
          src={`${process.env.REACT_APP_CLOUDINARY}${image}`}
        />
      )}
    </Box>
  );
}

export default PersonLine;
