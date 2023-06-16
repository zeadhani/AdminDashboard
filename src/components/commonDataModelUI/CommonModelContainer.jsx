import { useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../Theme";
import { useNavigate } from "react-router-dom";
import usePage from "../hooks/general/usePage";
import useCommonFilters from "../hooks/general/useCommonFilters";
import { useState } from "react";
import useModel from "../hooks/commonhooks/useModel";
import authFetch from "../../services/interceptors";
import FilterContainer from "../filters/FilterContainer";
import TableCard from "../Table/TableCard";
import CustomTableRow from "../Table/TableRow";
import RowIdentifier from "../Table/rowIdentifier";
import DateCell from "../Table/DateCell";
import ActionsButtonsTable from "../Table/ActionsButtonsTable";

const columns = [
  { id: "name", label: "Name" },
  { id: "created_at", label: "Created_At" },
];
const sortArray = ["createdAt", "name"];
function CommonModelContainer({ model }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { data, count, getData } = useModel(
    setLoading,
    rowsPerPage,
    page,
    sort,
    orderBy,
    search,
    setError,
    model
  );
  const handleDeleteModelItem = (name) => {
    return async () => {
      setLoading(true);
      try {
        await authFetch.delete(`/${model}/${name}`);
        getData();
        setError(false);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
  };
  const handleRestFilters = () => {
    resetCommonFilters();
  };

  const handleTitleClick = () => {
    navigate(`/add-new/${model}`);
  };
  return (
    <>
      <FilterContainer
        handleRestFilters={handleRestFilters}
        name={model}
        theme={theme}
        addNav={handleTitleClick}
        colors={colors}
        search={search}
        handleSearchChange={handleSearchChange}
        handleSortChange={handleSortChange}
        sort={sort}
        handleOrderByChange={handleOrderByChange}
        orderBy={orderBy}
        sortArray={sortArray}
        searchLabel={"Search By " + model + " Name"}
        commonmodel={"true"}
      />
      <TableCard
        columns={columns}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        error={error}
        loading={loading}
        model={data}
      >
        {data?.map((row, index) => {
          return (
            <CustomTableRow colors={colors} key={row.id}>
              <RowIdentifier>{row.name}</RowIdentifier>
              <DateCell date={row.createdAt} />

              <ActionsButtonsTable
                deleteAction={handleDeleteModelItem(row.name)}
                // editAction={editAction(row?.id)}
         
                colors={colors}
              />
            </CustomTableRow>
          );
        })}
      </TableCard>
    </>
  );
}

export default CommonModelContainer;
