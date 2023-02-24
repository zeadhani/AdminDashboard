import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ImageFileUpload(props) {
  const {
    label,
    handleImageUpload,
    imageFileerror,
    add,
    image,
    editable,
    setAdd,
    resetImageFile,
  } = props;

  const triggerAdd = () => {
    setAdd((prev) => !prev);
    if (!add) {
      resetImageFile();
    }
  };
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
        <TextField
          sx={{ flex: 1 }}
          variant="standard"
          type="file"
          onChange={handleImageUpload}
          error={imageFileerror ? true : false}
          helperText={imageFileerror}
        />
      )}
      {!add && (
        <LazyLoadImage
          width={80}
          style={{ borderRadius: 5 }}
          src={`${process.env.REACT_APP_CLOUDINARY}${image}`}
        />
      )}
    </Stack>
  );
}

export default ImageFileUpload;
