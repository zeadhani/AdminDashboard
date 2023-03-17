import {
  Box,
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
import { tokens } from "../../Theme";
import LinearProg from "../global/LinearProg";

function TableCard({
  children,
  columns,
  count,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  error,
  loading,
  model,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor:
        theme?.palette.mode === "dark" ? colors.blueAccent[600] : "#1F2A40",
      color: "#fff",
      fontWeight: "bold",
    },
  }));

  return (
    <>
      <LinearProg loading={loading} />
      {error && (
        <Box sx={{ height: "73vh" }} p={2}>
          Error , could not fetch data
        </Box>
      )}
      {model?.length === 0 && !error && !loading && (
        <Box sx={{ height: "73vh" }} p={2}>
          No items Found
        </Box>
      )}
      {model?.length > 0 && (
        <TableContainer sx={{ height: "73vh" }}>
          <Table stickyHeader={true} sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell key={column.id}>
                    {column.label}
                  </StyledTableCell>
                ))}
                <StyledTableCell sx={{ textAlign: "center" }}>
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{!error && children}</TableBody>
            <TableFooter
              sx={{
                position: "sticky",
                insetBlockEnd: -1,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? colors.blueAccent[600]
                    : "#1F2A40",
              }}
            >
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  count={count ? count : 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    color: "#fff",
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default TableCard;
