import * as React from "react";
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import { IconButton, InputBase, LinearProgress } from "@mui/material";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Paper,
  Select,
} from "@mui/material";
import { tokens } from "../../Theme";
import { useState } from "react";
import Header from "../../components/Header";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import TableCard from "../../components/TableCard";
import { Search } from "@mui/icons-material";
import { Stack } from "@mui/system";
 

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

function ProductsDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page")) : 0
  );
  const [search, setSearch] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    searchParams.get("rowsPerPage")
      ? parseInt(searchParams.get("rowsPerPage"))
      : 5
  );
  const [count, setCount] = useState(0);

  const [sort, setSort] = useState(
    searchParams.get("sort") ? searchParams.get("sort") : "createdAt"
  );

  const [orderBy, setOrderBy] = useState(
    searchParams.get("orderBy") ? searchParams.get("orderBy") : "asc"
  );
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState(
    searchParams.get("filtered") ? searchParams.get("filtered").split(",") : []
  );
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };
  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setFiltered(typeof value === "string" ? value.split(",") : value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
      setLoading(true);

      const products = await axios.get(
        `http://localhost:3001/products?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}&filter=${filtered}`
      );
      setProducts(products.data.data);
      setCount(products.data.totalCount);
      setLoading(false);
    };

    navigate({
      search: `?${createSearchParams({
        rowsPerPage,
        page,
        sort,
        orderBy,
        search,
        filtered: [filtered],
      })}`,
    });
    getProducts();
  }, [rowsPerPage, page, count, sort, orderBy, search, filtered]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesdata = await axios.get(`http://localhost:3001/category`);
      setCategories(categoriesdata.data);
    };
    getCategories();
  }, []);

  const columns = [
    { id: "id", label: "Id" },
    { id: "name", label: "Name" },
    { id: "slug", label: "Slug" },
    { id: "price", label: "Price" },
    { id: "category", label: "Category" },
    { id: "created_at", label: "Created_At" },
  ];

  return (
    <Box mx="20px">
      <Header title={"BOGO PRODUCTS"} subtitle={"Managing bogo products!"} />
      <Stack
        direction={"row"}
        spacing={6}
        sx={{
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <FormControl sx={{ width: 300 }}>
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="6px"
            height={"55px"}
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
            />
            <IconButton type="button" sx={{ p: 1 }}>
              <Search />
            </IconButton>
          </Box>
        </FormControl>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            onChange={handleSortChange}
          >
            <MenuItem value={"createdAt"}>Created At</MenuItem>
            <MenuItem value={"price"}>Price</MenuItem>
            <MenuItem value={"name"}>Name</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="demo-simple-select-label">Order by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderBy}
            onChange={handleOrderByChange}
          >
            <MenuItem value={"asc"}>Ascending</MenuItem>
            <MenuItem value={"desc"}>Descending</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 400 ,flex:1}}>
          <InputLabel id="demo-multiple-chip-label">Filter</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={filtered}
            onChange={handleFilterChange}
            MenuProps={MenuProps}
          >
            {categories.map((item) => (
              <MenuItem key={item._id} value={item?._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Box sx={{ width: "100%" }} height={5}>
        {loading && (
          <LinearProgress
            color={theme.palette.mode === "dark" ? "info" : "primary"}
            sx={{ height: "5px" }}
          />
        )}
      </Box>

      <TableCard
        component={Paper}
        sx={{ maxHeight: "70vh" }}
        columns={columns}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      >
        {products.map((row, index) => (
          <StyledTableRow
            key={row._id}
            onClick={() => navigate(`/Products/${row.slug}`)}
            sx={{
              "&:hover": {
                cursor: "pointer",
                backgroundColor: colors.grey[900],
              },
            }}
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.slug}</TableCell>
            <TableCell>{row.price} EGP</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell>{moment(row.createdAt).format("YYYY-MM-DD")}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.redAccent[600],
                    borderRadius: "5px",
                    marginRight: "5px",
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.blueAccent[600],
                    borderRadius: "5px",
                    marginLeft: "5px",
                  }}
                >
                  Edit
                </Button>
              </Box>
            </TableCell>
          </StyledTableRow>
        ))}
      </TableCard>
    </Box>
  );
}

export default ProductsDashboard;
