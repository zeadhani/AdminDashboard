import { Typography } from "@mui/material";
import React from "react";
import LinearProg from "../LinearProg";
import { Stack } from "@mui/system";

function FormCard({ children, serverErrors, loading, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: 700, margin: "auto", paddingTop: "20px",paddingBottom:"20px" }}
    >
      {serverErrors && (
        <Typography my={2} textAlign={"center"} variant="h5" color={"#d32f2f"}   fontWeight={'bold'}>
          {serverErrors}
        </Typography>
      )}
      <LinearProg loading={loading} />
      <Stack spacing={3}>{children}</Stack>
    </form>
  );
}

export default FormCard;
