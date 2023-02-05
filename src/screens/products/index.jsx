import * as React from "react";
import TableCell from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { tokens } from "../../Theme";
import { useState } from "react";
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
import usePage from "../../components/hooks/general/usePage";
import useFilteredData from "../../components/hooks/products/useFilteredData";
import useProduct from "../../components/hooks/products/useProduct";
import useCommonFilters from "../../components/hooks/general/useCommonFilters";
import useProductFilters from "../../components/hooks/products/useProductFilters";

const sortArray = ["createdAt", "price", "name"];
const columns = [
  { id: "name", label: "Name" },
  { id: "image", label: "Image" },
  { id: "price", label: "Price" },
  { id: "brand", label: "Brand" },
  { id: "gender", label: "Gender" },
  { id: "category", label: "Category" },
  { id: "created_at", label: "Created_At" },
];
function ProductsDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { page, handleChangePage, handleChangeRowsPerPage, rowsPerPage } =
    usePage();
  const { brands, categories, gender } = useFilteredData();
  const {
    sort,
    search,
    orderBy,
    handleOrderByChange,
    handleSearchChange,
    resetCommonFilters,
    handleSortChange,
  } = useCommonFilters();
  const {
    filtered,
    filteredBrand,
    filteredGneder,
    handleFilterBrandChange,
    handleFilterGenderChange,
    handleFilterChange,
    resetProductFilters,
  } = useProductFilters();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { products, count, getProducts } = useProduct(
    rowsPerPage,
    page,
    sort,
    orderBy,
    search,
    filtered,
    filteredGneder,
    filteredBrand,
    setLoading,
    setError
  );
  const handleDeleteProduct = (id) => {
    return async (e) => {
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
  };
  const handleRestFilters = () => {
    resetProductFilters();
    resetCommonFilters();
  };
  const addNavFilter = () => {
    navigate("/products/add-product");
  };
  const editAction = (name) => {
    return () => {
      navigate(`/Products/${name}`, {
        state: { editable: true },
      });
    };
  };
  const viewAction = (name) => {
    return () => {
      navigate(`/Products/${name}`, {
        state: { editable: false },
      });
    };
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
          filterarray={gender}
          onChange={handleFilterGenderChange}
          multiple={false}
          value={filteredGneder}
        />
        <CustomFilter
          label={"Category"}
          value={filtered}
          filterarray={categories}
          onChange={handleFilterChange}
          multiple={true}
        />
        <CustomFilter
          label={"Brands"}
          value={filteredBrand}
          filterarray={brands}
          onChange={handleFilterBrandChange}
          multiple={true}
          sx={{ flex: 1 }}
        />
      </FilterContainer>
      <LinearProg loading={loading} />
      {error && <Box p={2}>Error , could not fetch data</Box>}
      {products.length === 0 && !error && !loading && (
        <Box p={2}>No items Found</Box>
      )}
      <TableCard
        columns={columns}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      >
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
                deleteAction={handleDeleteProduct(row.id)}
                editAction={editAction(row?.id)}
                viewAction={viewAction(row?.id)}
                colors={colors}
              />
            </CustomTableRow>
          ))}
      </TableCard>
    </CustomContainer>
  );
}

export default ProductsDashboard;
