import { Skeleton, Stack } from "@mui/material";
import React from "react";

function LoadingMessage() {
  return (
    <Stack spacing={1} mt={2}>
      <Stack direction={"row"} spacing={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1rem" }} />
      </Stack>
      <Skeleton variant="rectangular" height={200} />
    </Stack>
  );
}

export default LoadingMessage;
