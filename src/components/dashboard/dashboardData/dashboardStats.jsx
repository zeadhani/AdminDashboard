
import React from "react";
import TopStatsData from "./topstats/topStatsData";
import BarChartStats from "./chartsStats/BarChartStats";
import PieChartStats from "./chartsStats/PieChartStats";
import LineChartStats from "./chartsStats/LineChartStats";
import TransactionStats from "./TransactionsStats/TransactionStats";
import ExpenseStats from "./Expense/ExpenseStats";

function DashboardStats({ colors }) {
  return (
    <>
      <TopStatsData colors={colors} />
      <LineChartStats colors={colors} />
      <TransactionStats colors={colors} />
      <ExpenseStats colors={colors} />
      <PieChartStats colors={colors} />
      <BarChartStats colors={colors} />
    </>
  );
}

export default DashboardStats;
