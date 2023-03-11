import * as React from "react";
import TableCell from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../Theme";
import { useState } from "react";
import TableCard from "../../components/Table/TableCard";
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
import authFetch from "../../services/interceptors";

const sortArray = ["createdAt", "price", "name"];
const stockArrary = ["inStock", "outStock"];
const columns = [
  { id: "name", label: "Name" },
  { id: "image", label: "Image" },
  { id: "price", label: "Price" },
  { id: "brand", label: "Brand" },
  { id: "category", label: "Category" },
  { id: "created_at", label: "Created_At" },
  { id: "stock", label: "Stock" },
];
function ProductsDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { page, handleChangePage, handleChangeRowsPerPage, rowsPerPage } =
    usePage();
  const { data } = useFilteredData();
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
    handleFilterBrandChange,
    handleFilterChange,
    resetProductFilters,
    filteredStock,
    handleFilterStockChange,
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
    filteredBrand,
    setLoading,
    setError,
    filteredStock
  );
  const handleDeleteProduct = (id) => {
    return async (e) => {
      setLoading(true);
      try {
        await authFetch.delete(`/products/${id}`);
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

  const isBiggerThan0 = (element) => element.count > 0;

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
        searchLabel={"Search By Product Name"}
      >
        <CustomFilter
          label={"stock"}
          filterarray={stockArrary}
          onChange={handleFilterStockChange}
          value={filteredStock}
          multiple={false}
          itemitself="true"
        />
        <CustomFilter
          label={"Category"}
          value={filtered}
          filterarray={data?.categories}
          onChange={handleFilterChange}
          multiple={true}
        />
        <CustomFilter
          label={"Brands"}
          value={filteredBrand}
          filterarray={data?.brands}
          onChange={handleFilterBrandChange}
          multiple={true}
          sx={{ flex: 1 }}
        />
      </FilterContainer>

      <TableCard
        columns={columns}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        error={error}
        loading={loading}
        model={products}
      >
        {products.map((row, index) => {
          const inStock =
            row.count > 0 || row.productItems?.some(isBiggerThan0);
          return (
            <CustomTableRow colors={colors} key={row.id}>
              <RowIdentifier>{row?.name}</RowIdentifier>
              <TableImage image={row?.image} />
              <TableCell>{row?.price} EGP</TableCell>
              <TableCell>{row.Brands?.name}</TableCell>
              <TableCell>{row.Category?.name}</TableCell>
              <DateCell date={row.createdAt} />
              <TableCell
                sx={{
                  color: inStock
                    ? colors.greenAccent[500]
                    : colors.redAccent[500],
                  fontWeight: "bold",
                }}
              >
                {inStock ? "In Stock" : "Out Of Stock"}
              </TableCell>
              <ActionsButtonsTable
                deleteAction={handleDeleteProduct(row.id)}
                editAction={editAction(row?.id)}
                viewAction={viewAction(row?.id)}
                colors={colors}
              />
            </CustomTableRow>
          );
        })}
      </TableCard>
    </CustomContainer>
  );
}

export default ProductsDashboard;
