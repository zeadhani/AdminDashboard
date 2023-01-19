import * as React from "react";
import TableCell from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { Box } from "@mui/material";
import { tokens } from "../../Theme";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import TableCard from "../../components/Table/TableCard";
import LinearProg from "../../components/global/LinearProg";
import ActionsButtonsTable from "../../components/Table/ActionsButtonsTable";
import TableImage from "../../components/Table/TableImage";
import CustomTableRow from "../../components/Table/TableRow";
import CustomContainer from "../global/CustomContainer";
import CustomFilter from "../../components/filters/CustomSingleFilter";
import FilterContainer from "../../components/filters/FilterContainer";
import RowIdentifier from "../../components/Table/rowIdentifier";
import DateCell from "../../components/Table/DateCell";
import usePage from "../../components/hooks/usePage";
import useFilteredData from "../../components/hooks/products/useFilteredData";

const sortArray = ["createdAt", "price", "name"];
function ProductsDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { page, handleChangePage, handleChangeRowsPerPage, rowsPerPage } =
    usePage();
  const {brands,categories,gender} = useFilteredData();

  const [search, setSearch] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
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
  const [filteredGneder, setFilteredGender] = useState(
    searchParams.get("gender") ? searchParams.get("gender") : ""
  );
  const [filteredBrand, setfilteredBrand] = useState(
    searchParams.get("brand") ? searchParams.get("brand").split(",") : []
  );

  const [products, setProducts] = useState([]);
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
  const handleFilterGenderChange = (e) => {
    setFilteredGender(e.target.value);
  };
  const handleFilterBrandChange = (e) => {
    const {
      target: { value },
    } = e;
    setfilteredBrand(typeof value === "string" ? value.split(",") : value);
  };
  const getProducts = async () => {
    setLoading(true);
    try {
      const products = await axios.get(
        `${process.env.REACT_APP_API_URL}/products?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}&filter=${filtered}&gender=${filteredGneder}&brand=${filteredBrand}`
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
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`);
      getProducts();
      setError(false);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  const handleRestFilters = () => {
    setFiltered([]);
    setfilteredBrand([]);
    setFilteredGender("");
    setOrderBy("asc");
    setSort("createdAt");
    setSearch("");
  };

  useEffect(() => {
    navigate({
      search: `?${createSearchParams({
        rowsPerPage,
        page,
        sort,
        orderBy,
        search,
        gender: filteredGneder,
        brand: [filteredBrand],
        filtered: [filtered],
      })}`,
    });
    getProducts();
  }, [
    rowsPerPage,
    page,
    count,
    sort,
    orderBy,
    search,
    filtered,
    filteredGneder,
    filteredBrand,
  ]);



  const columns = [
    { id: "name", label: "Name" },
    { id: "image", label: "Image" },
    { id: "price", label: "Price" },
    { id: "brand", label: "Brand" },
    { id: "gender", label: "Gender" },
    { id: "category", label: "Category" },
    { id: "created_at", label: "Created_At" },
  ];
  const addNavFilter = () => {
    navigate("/products/add-product");
  };
  const editAction = (name) => {
    navigate(`/Products/${name}`, {
      state: { editable: true },
    });
  };
  const viewAction = (name) => {
    navigate(`/Products/${name}`, {
      state: { editable: false },
    });
  };
  return (
    <CustomContainer
      title={"BOGO PRODUCTS"}
      subtitle={"Managing bogo products!"}
    >
      <FilterContainer
        handleRestFilters={handleRestFilters}
        name={"product"}
        theme={theme}
        addNav={addNavFilter}
        colors={colors}
        search={search}
        handleSearchChange={handleSearchChange}
        handleSortChange={handleSortChange}
        sort={sort}
        handleOrderByChange={handleOrderByChange}
        orderBy={orderBy}
        sortArray={sortArray}
      >
        <CustomFilter
          label={"Gender"}
          filterArray={gender}
          onChange={handleFilterGenderChange}
          multiple={false}
          value={filteredGneder}
          itemItself={false}
        />
        <CustomFilter
          label={"Category"}
          value={filtered}
          filterArray={categories}
          onChange={handleFilterChange}
          itemItself={false}
          multiple={true}
        />
        <CustomFilter
          label={"Brands"}
          value={filteredBrand}
          filterArray={brands}
          onChange={handleFilterBrandChange}
          itemItself={false}
          multiple={true}
          sx={{ flex: 1 }}
        />
      </FilterContainer>

      <LinearProg loading={loading} />
      <TableCard
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
              <RowIdentifier>{row?.name}</RowIdentifier>
              <TableImage image={row?.image} />
              <TableCell>{row?.price} EGP</TableCell>
              <TableCell>{row.Brands?.name}</TableCell>
              <TableCell>{row.Gender?.name}</TableCell>
              <TableCell>{row.Category?.name}</TableCell>
              <DateCell date={row.createdAt} />
              <ActionsButtonsTable
                deleteAction={() => handleDeleteProduct(row.id)}
                editAction={() => editAction(row?.id)}
                viewAction={() => viewAction(row?.id)}
                colors={colors}
              />
            </CustomTableRow>
          ))}
      </TableCard>
    </CustomContainer>
  );
}

export default ProductsDashboard;
