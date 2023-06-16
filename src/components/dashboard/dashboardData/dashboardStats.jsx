import React from "react";
import TopStatsData from "./topstats/topStatsData";
import BarChartStats from "./chartsStats/BarChartStats";
import PieChartStats from "./chartsStats/PieChartStats";
import LineChartStats from "./chartsStats/LineChartStats";
import TransactionStats from "./TransactionsStats/TransactionStats";
import ExpenseStats from "./Expense/ExpenseStats";
import useDashboardData from "../../hooks/dashboard/useDashboardData";
import { Box, CircularProgress, Typography } from "@mui/material";

function DashboardStats({ colors }) {
  const { data, isLoading, isError } = useDashboardData();
  return (
    <>
      {isError && <Typography>Error with the dashboard</Typography>}
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            height: "80vh",
            width: "92vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="info" />
        </Box>
      )}
      {data && (
        <>
          <TopStatsData
            merchants={data.merchantNumber}
            messages={data.messages}
            requests={data.requestsNumber}
            users={data.userNumber}
            colors={colors}
          />
          <LineChartStats colors={colors} data={data.topFiveBrandsRequests} />
          <TransactionStats transactions={data.transactions} colors={colors} />
          {/* <ExpenseStats colors={colors} /> */}
          <PieChartStats data={data.topFiveBrandsProducts} colors={colors} />
          <BarChartStats colors={colors} data={data.topFiveBrandsOffers} />
        </>
      )}
    </>
  );
}

export default DashboardStats;
