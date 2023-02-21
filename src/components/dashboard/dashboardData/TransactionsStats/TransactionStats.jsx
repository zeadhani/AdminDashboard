import { Box, Typography } from "@mui/material";
import React from "react";
import moment from "moment";

function TransactionStats({ colors, transactions }) {
  return (
    <Box
      sx={{ gridColumn: { lg: "span 4", sm: "span 6", xs: "span 3" } }}
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      overflow="auto"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.blueAccent[500]}`}
        colors={colors.grey[100]}
        p="15px"
      >
        <Typography
          color={colors.greenAccent[500]}
          variant="h5"
          fontWeight="600"
        >
          Recent Orders
        </Typography>
      </Box>
      {transactions.map((item) => (
        <Box
          key={item.id}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.blueAccent[500]}`}
          p="15px"
        >
          <Box>
            <Typography
              color={colors.greenAccent[500]}
              variant="h5"
              fontWeight="600"
            >
              #{item.id}
            </Typography>
            <Typography color={colors.blueAccent[500]}>
              {item.Users?.email}
            </Typography>
          </Box>
          <Box color={colors.greenAccent[500]}>
            {moment(item.createdAt).format("YYYY-MM-DD")}
          </Box>
          <Box
            backgroundColor={colors.blueAccent[500]}
            p="5px 10px"
            borderRadius="4px"
          >
            {Math.floor(item.price)} Egp
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default TransactionStats;
