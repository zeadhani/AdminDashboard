import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import CustomTextField from "./CustomTextField";

function ImageFileUpload(props) {
  const {
    label,
    handleImageUpload,
    imageFileerror,
    add,
    image,
    editable,
    triggerAdd,
  } = props;
  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction={"row"}>
        <Typography display={"flex"} alignItems={"center"}>
          {label}
        </Typography>
        {editable && (
          <Button
          disableRipple
            variant="text"
            color={add ? "error" : "success"}
            onClick={triggerAdd}
            sx={{ height: "40px" }}
          >
            {add ? "Dismiss" : "Change"}
          </Button>
        )}
      </Stack>
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
      {!add && (
        <img
          width={80}
          style={{ borderRadius: 5 }}
          src={`https://drive.google.com/uc?export=view&id=${image}`}
        />
      )}
    </Stack>
  );
}

export default ImageFileUpload;
