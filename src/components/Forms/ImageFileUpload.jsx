import { Stack, Typography } from "@mui/material";
import React from "react";
import CustomTextField from "./CustomTextField";

function ImageFileUpload({ label, handleImageUpload, imageFileerror, add }) {
  return (
    <Stack direction={"row"} spacing={2}>
      <Typography display={"flex"} alignItems={"center"}>
        {label}
      </Typography>
      {add && (
        <CustomTextField
          sx={{ flex: 1 }}
          variant="standard"
          type="file"
          onChange={handleImageUpload}
          error={imageFileerror ? true : false}
          helperText={imageFileerror}
        />
      )}
    </Stack>
  );
}

export default ImageFileUpload;
