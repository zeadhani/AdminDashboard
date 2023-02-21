import { Box, Typography } from "@mui/material";
import React from "react";
import { mockTransactions } from "../../../../data/mockData";

function TransactionStats({colors}) {
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
      {mockTransactions.map((transaction, i) => (
        <Box
          key={`${transaction.txId}-${i}`}
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
              {transaction.txId}
            </Typography>
            <Typography color={colors.blueAccent[500]}>
              {transaction.user}
            </Typography>
          </Box>
          <Box color={colors.greenAccent[500]}>{transaction.date}</Box>
          <Box
            backgroundColor={colors.blueAccent[500]}
            p="5px 10px"
            borderRadius="4px"
          >
            {transaction.cost} Egp
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default TransactionStats;
