import React from "react";
import CustomContainer from "../global/CustomContainer";
import FilterContainer from "../../components/filters/FilterContainer";
import { TableCell, useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import usePage from "../../components/hooks/general/usePage";
import useCommonFilters from "../../components/hooks/general/useCommonFilters";
import CustomFilter from "../../components/filters/CustomSingleFilter";
import useRequestFilter from "../../components/hooks/requests/useRequestFilter";
import useRequests from "../../components/hooks/requests/useRequests";
import { useState } from "react";
import TableCard from "../../components/Table/TableCard";
import CustomTableRow from "../../components/Table/TableRow";
import RowIdentifier from "../../components/Table/rowIdentifier";
import DateCell from "../../components/Table/DateCell";
import ActionsButtonsTable from "../../components/Table/ActionsButtonsTable";
import authFetch from "../../services/interceptors";
const columns = [
  { id: "user", label: "User" },
  { id: "name", label: "Name" },
  { id: "brand", label: "Brand" },
  { id: "offer", label: "Offer" },
  { id: "status", label: "Status" },
  { id: "created_at", label: "Created_At" },
];
const sortArray = ["createdAt"];
const filterRequestArray = ["incomplete", "complete"];
function RequestsDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
  const { filteredRequest, handleFilterRequest, resetRequestsFilter } =
    useRequestFilter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { count, getRequests, requests } = useRequests({
    filteredRequest,
    orderBy,
    page,
    rowsPerPage,
    search,
    setError,
    setLoading,
    sort,
  });
  const handleRestFilters = () => {
    resetCommonFilters();
    resetRequestsFilter();
  };

  const handleDeleteRequest = (id) => {
    return async (e) => {
      setLoading(true);
      try {
        await authFetch.delete(`/request/${id}`);
        getRequests();
        setError(false);
      } catch (err) {
        console.log("first");
        setError(true);
      }
      setLoading(false);
    };
  };

  return (
    <CustomContainer
      title={"bogo requests"}
      subtitle={"managing bogo requests!"}
    >
      <FilterContainer
        handleRestFilters={handleRestFilters}
        theme={theme}
        colors={colors}
        search={search}
        handleSearchChange={handleSearchChange}
        handleSortChange={handleSortChange}
        sort={sort}
        handleOrderByChange={handleOrderByChange}
        orderBy={orderBy}
        sortArray={sortArray}
        searchLabel={"Search By User Email"}
      >
        <CustomFilter
          label={"Status"}
          value={filteredRequest}
          filterarray={filterRequestArray}
          onChange={handleFilterRequest}
          itemitself={"true"}
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
        model={requests}
      >
        {requests?.map((row, index) => {
          const complete = row.status === "complete";
          return (
            <CustomTableRow colors={colors} key={row.id}>
              <RowIdentifier>{row.Users?.email}</RowIdentifier>
              <TableCell>{row.Product?.name}</TableCell>
              <TableCell>{row.Product?.Brands?.name}</TableCell>
              <TableCell>{row.offers?.name}</TableCell>
              <TableCell
                sx={{
                  color: complete
                    ? colors.greenAccent[500]
                    : colors.redAccent[500],
                  fontWeight: "bold",
                }}
              >
                {row.status}
              </TableCell>
              <DateCell date={row.createdAt} />
              <ActionsButtonsTable
                deleteAction={!complete ? handleDeleteRequest(row?.id) : null}
                colors={colors}
              />
            </CustomTableRow>
          );
        })}
      </TableCard>
    </CustomContainer>
  );
}

export default RequestsDashboard;
