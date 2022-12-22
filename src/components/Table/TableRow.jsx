import React from "react";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

function CustomTableRow(props) {
  const { children, colors } = props;
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: colors.primary[400],
    },
    "&:nth-of-type(even)": {
      backgroundColor:
        theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[800],
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <StyledTableRow
      sx={{
        "&:hover": {
          cursor: "pointer",
          backgroundColor: colors.grey[900],
        },
      }}
      {...props}
    >
      {children}
    </StyledTableRow>
  );
}

export default CustomTableRow;
