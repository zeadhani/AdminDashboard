import {
  styled,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material";
import React from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Paper } from "@mui/material";
import { tokens } from "../../Theme";

function TableCard({
  children,
  columns,
  count,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: colors.blueAccent[600],
    },
  }));

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "65vh" }}>
      <Table stickyHeader sx={{ minWidth: 1200 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
            ))}
            <StyledTableCell sx={{ textAlign: "center" }}>
              Actions
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
        <TableFooter
          sx={{
            position: "sticky",
            insetBlockEnd: 0,
            backgroundColor: colors.blueAccent[600],
          }}
        >
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 25, 50]}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default TableCard;
