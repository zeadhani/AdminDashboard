import { TableCell } from "@mui/material";
import moment from "moment";
import React from "react";

function DateCell(props) {
  const { date } = props;
  return <TableCell {...props}>{moment(date).format("YYYY-MM-DD")}</TableCell>;
}

export default DateCell;
