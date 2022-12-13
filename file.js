import * as React from "react";
import { styled } from "@mui/material/styles";
import Table, { tableClasses } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  Paper,
  Select,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { mockDataTeam } from "../../data/mockData";
import { tokens } from "../../Theme";
import { useState } from "react";
import Header from "../../components/Header";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import axios from "axios";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function UsersDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState([]);
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };
  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setFiltered(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: colors.blueAccent[600],
    },
  }));

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
  useEffect(() => {
    const getProducts = async () => {
      const products = await axios.get(
        `http://localhost:3001/products?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort}`
      );
      console.log(page);
      setProducts(products.data.data);
      setCount(products.data.totalCount);
    };
    getProducts();
  }, [rowsPerPage, page, count, sort]);
  const columns = [
    { id: "id", label: "Id" },
    { id: "name", label: "Name" },
    { id: "slug", label: "Slug" },
    { id: "price", label: "Price" },
    // { id: "phone", label: "Phone" },
    // { id: "access", label: "Role" },
  ];
  const rows = mockDataTeam;
  return (
    <Box mx="20px">
      <Header title={"BOGO USERS"} subtitle={"Managing bogo users!"} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Age"
            onChange={handleSortChange}
          >
            <MenuItem value={""}>Default</MenuItem>
            <MenuItem value={"price"}>Price</MenuItem>
            <MenuItem value={"Created_At"}>Created At</MenuItem>
            <MenuItem value={"Name"}>Name</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 400 }}>
          <InputLabel id="demo-multiple-chip-label">Filter</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={filtered}
            onChange={handleFilterChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {["Admin", "Manager", "Frontend", "Backend"].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader sx={{ minWidth: 1000 }}>
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
          <TableBody>
            {products.map((row) => (
              <StyledTableRow
                key={row.id}
                onClick={() => alert(row.name)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: colors.grey[900],
                  },
                }}
              >
                <StyledTableCell>{row._id}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.slug}</StyledTableCell>
                <StyledTableCell>{row.price}</StyledTableCell>
                {/* <StyledTableCell>{row.phone}</StyledTableCell>
                  <StyledTableCell>{row.access}</StyledTableCell> */}
                <StyledTableCell sx={{ textAlign: "center" }}>
                  <Box display={"flex"} justifyContent={"space-around"}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: colors.redAccent[600],
                        borderRadius: "5px",
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: colors.blueAccent[600],
                        borderRadius: "5px",
                      }}
                    >
                      Edit
                    </Button>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter
            sx={{
              position: "sticky",
              insetBlockEnd: 0,
              backgroundColor: colors.blueAccent[600],
              //   backgroundColor: colors.blueAccent[600],
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
    </Box>
  );
}

export default UsersDashboard;
// const columns = [
//     { field: "id", headerName: "ID" },
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 1,
//       minWidth: 200,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "age",
//       headerName: "Age",
//       type: "number",
//       headerAlign: "left",
//       align: "left",
//     },
//     {
//       field: "phone",
//       headerName: "Phone Number",
//       flex: 1,
//       minWidth: 200,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//       minWidth: 200,
//     },
//     {
//       field: "adress",
//       headerName: "Adress",
//       headerAlign: "left",
//       align: "left",
//     },
//     {
//       headerName: "Actions",
//       headerAlign: "center",
//       align: "center",
//       justifyContent: "space-around",
//       flex: 1,
//       minWidth: 200,
//       sortable: false,
//       hideable: false,
//       renderCell: ({ row: { id } }) => {
//         return (
//           <Box
//             display={"flex"}
//             justifyContent={"space-around"}
//             width={"80%"}
//           >
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: colors.redAccent[600],
//                 borderRadius: "5px",
//               }}

//             >
//               Delete
//             </Button>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: colors.blueAccent[600],
//                 borderRadius: "5px",
//               }}

//             >
//               Edit
//             </Button>
//           </Box>
//         );
//       },
//     },
//   ];
//   return (
//     <Box mx="20px">
//       <Header title={"BOGO USERS"} subtitle={"Managing bogo users!"} />
//       <Table rowData={mockUsers} ColumnData={columns} />
//     </Box>
//   );
