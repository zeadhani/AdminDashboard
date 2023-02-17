import React from "react";
import CustomContainer from "../global/CustomContainer";
import usePage from "../../components/hooks/general/usePage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../Theme";
import { TableCell, useTheme } from "@mui/material";
import FilterContainer from "../../components/filters/FilterContainer";
import useCommonFilters from "../../components/hooks/general/useCommonFilters";
import CustomFilter from "../../components/filters/CustomSingleFilter";
import useOrdersFilteredData from "../../components/hooks/orders/useOrdersFilteredData";
import useBrandFilters from "../../components/hooks/orders/useOrdersData";
import TableCard from "../../components/Table/TableCard";
import CustomTableRow from "../../components/Table/TableRow";
import RowIdentifier from "../../components/Table/rowIdentifier";
import DateCell from "../../components/Table/DateCell";
import ActionsButtonsTable from "../../components/Table/ActionsButtonsTable";
import useOrders from "../../components/hooks/orders/useOrders";
import authFetch from "../../services/interceptors";

const sortArray = ["createdAt", "total"];
const columns = [
  { id: "offer", label: "Offer Name" },
  { id: "brand", label: "Brand Name" },
  { id: "total", label: "Total" },
  { id: "created_at", label: "Created_At" },
];
function OrdersDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { page, handleChangePage, handleChangeRowsPerPage, rowsPerPage } =
    usePage();
  const {
    sort,
    search,
    orderBy,
    handleOrderByChange,
    handleSearchChange,
    resetCommonFilters,
    handleSortChange,
  } = useCommonFilters();
  const { filteredBrand, handleFilterBrandChange, resetBrandFilters } =
    useBrandFilters();
  const { ordersFilteredData } = useOrdersFilteredData();
  const { orders, count, getOrders } = useOrders(
    setLoading,
    rowsPerPage,
    page,
    sort,
    orderBy,
    search,
    setError,
    filteredBrand
  );

  const handleRestFilters = () => {
    resetCommonFilters();
    resetBrandFilters();
  };
  const handleDeleteOrder = (id) => {
    return async () => {
      setLoading(true);
      try {
        await authFetch.delete(`/orders/${id}`);
        getOrders();
        setError(false);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
  };
  const viewAction = (id) => {
    return () => {
      navigate(`/Orders/${id}`);
    };
  };
  return (
    <CustomContainer
      title={"BOGO ORDERS"}
      subtitle={"Managing Your Bogo orders"}
    >
      <FilterContainer
        handleRestFilters={handleRestFilters}
        name={""}
        theme={theme}
        colors={colors}
        search={search}
        handleSearchChange={handleSearchChange}
        handleSortChange={handleSortChange}
        sort={sort}
        handleOrderByChange={handleOrderByChange}
        orderBy={orderBy}
        sortArray={sortArray}
        searchLabel={"Search By Brands"}
      >
        <CustomFilter
          label={"Brand"}
          value={filteredBrand}
          filterarray={ordersFilteredData}
          onChange={handleFilterBrandChange}
          sx={{ flex: 1 }}
          multiple={true}
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
        model={orders}
      >
        {orders.map((row, index) => (
          <CustomTableRow colors={colors} key={row.id}>
            <RowIdentifier>{row.offers.name}</RowIdentifier>
            <TableCell>{row.offers.Brands.name}</TableCell>
            <TableCell>{row.total}</TableCell>
            <DateCell date={row.createdAt} />
            <ActionsButtonsTable
              deleteAction={handleDeleteOrder(row.id)}
              viewAction={viewAction(row?.id)}
              colors={colors}
            />
          </CustomTableRow>
        ))}
      </TableCard>
    </CustomContainer>
  );
}

export default OrdersDashboard;
