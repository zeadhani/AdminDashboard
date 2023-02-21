import { Box, Typography } from "@mui/material";
import React from "react";
import LinearProg from "../global/LinearProg";
import { Stack } from "@mui/system";

function FormCard({ children, serverErrors, loading, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          width: { xs: "85%", md: "55%" },
          margin: "auto",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        {serverErrors && (
          <Box
            borderRadius={3}
            px={4}
            mb={2}
            sx={{
              cursor: "pointer",
              width: "100%",
              marginX: "auto",
              border: "1px solid #d32f2f",
            }}
          >
            <Typography
              my={2}
              textAlign={"center"}
              variant="h4"
              color={"#d32f2f"}
              fontWeight={"bold"}
            >
              {serverErrors}
            </Typography>
          </Box>
        )}
        <LinearProg loading={loading} />
        <Stack spacing={3}>{children}</Stack>
      </Box>
    </form>
  );
}

export default FormCard;
