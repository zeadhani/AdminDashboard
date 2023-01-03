import * as React from "react";
import TableCell from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import { IconButton, InputBase } from "@mui/material";
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
import TableCard from "../../components/Table/TableCard";
import { Search } from "@mui/icons-material";
import { Stack } from "@mui/system";
import LinearProg from "../../components/LinearProg";
import ActionsButtonsTable from "../../components/Table/ActionsButtonsTable";
import TableImage from "../../components/Table/TableImage";
import CustomTableRow from "../../components/Table/TableRow";

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
  const [error, setError] = useState(false);

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

  const getProducts = async () => {
    setLoading(true);
    try {
      const products = await axios.get(
        `${process.env.REACT_APP_API_URL}/products?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}&filter=${filtered}`
      );

      setProducts(products.data.data.data);
      setCount(products.data.data.totalCount);
      setError(false);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`);
      getProducts();
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
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
      const categoriesdata = await axios.get(`${process.env.REACT_APP_API_URL}/category`);
      setCategories(categoriesdata.data);
    };
    getCategories();
  }, []);

  const columns = [
    { id: "id", label: "Id" },
    { id: "image", label: "Image" },
    { id: "name", label: "Name" },
    { id: "price", label: "Price" },
    { id: "category", label: "Category" },
    { id: "created_at", label: "Created_At" },
  ];

  return (
    <Box mx="20px">
      <Header title={"BOGO PRODUCTS"} subtitle={"Managing bogo products!"} />
      <Stack
        direction={"row"}
        width={"100%"}
        spacing={3}
        sx={{
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Stack direction={"row"} spacing={3} width={"100%"}>
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
              <IconButton type="button" sx={{ p: 1 }} disableRipple>
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
              <MenuItem value={"createdAt"} key={"createdAt"}>
                Created At
              </MenuItem>
              <MenuItem value={"price"} key={"price"}>
                Price
              </MenuItem>
              <MenuItem value={"name"} key={"name"}>
                Name
              </MenuItem>
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
              <MenuItem value={"asc"} key={"asc"}>
                Ascending
              </MenuItem>
              <MenuItem value={"desc"} key={"desc"}>
                Descending
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300, flex: 1 }}>
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
                <MenuItem key={item.id} value={item?.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Box>
          <Button
            variant="outlined"
            sx={{ height: "100%" }}
            color={theme.palette.mode === "dark" ? "secondary" : "primary"}
            onClick={() => navigate("/products/add-product")}
          >
            Add
          </Button>
        </Box>
      </Stack>

      <LinearProg loading={loading} />
      <TableCard
        component={Paper}
        columns={columns}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      >
        {error && <Box p={2}>Error , could not fetch data</Box>}
        {products.length === 0 && !error && !loading && (
          <Box p={2}>No items Found</Box>
        )}

        {!error &&
          products.map((row, index) => (
            <CustomTableRow colors={colors} key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableImage image={row.image} />
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price} EGP</TableCell>
              <TableCell>{row.Category?.name}</TableCell>
              <TableCell>
                {moment(row.createdAt).format("YYYY-MM-DD")}
              </TableCell>
              <ActionsButtonsTable
                deleteAction={() => handleDeleteProduct(row.id)}
                editAction={() =>
                  navigate(`/Products/${row.name}`, {
                    state: { editable: true },
                  })
                }
                viewAction={() =>
                  navigate(`/Products/${row.name}`, {
                    state: { editable: false },
                  })
                }
                colors={colors}
              />
            </CustomTableRow>
          ))}
      </TableCard>
    </Box>
  );
}

export default ProductsDashboard;
