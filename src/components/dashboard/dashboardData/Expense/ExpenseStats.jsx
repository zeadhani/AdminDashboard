import { Box, Typography } from "@mui/material";
import React from "react";
import ProgressCircle from "../../../global/ProgressCircle";

function ExpenseStats({colors}) {
  return (
    <Box
      sx={{ gridColumn: { lg: "span 4", xs: "span 3" } }}
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      p="30px"
    >
      <Typography variant="h5" fontWeight="600">
        Campaign
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
        <ProgressCircle size="125" />
        <Typography
          variant="h5"
          color={colors.blueAccent[500]}
          sx={{ mt: "15px" }}
        >
          48,352 EGP Expense data
        </Typography>
        <Typography
          color={colors.greenAccent[500]}
          sx={{
            display: {
              lg: "block",
              xs: "none",
            },
          }}
        >
          Takes into account any additional unforeseen expenses and costs.
        </Typography>
      </Box>
    </Box>
  );
}

export default ExpenseStats;
