import React, { useState } from "react";
import CustomContainer from "../global/CustomContainer";
import TableCard from "../../components/Table/TableCard";
import usePage from "../../components/hooks/general/usePage";
import useCommonFilters from "../../components/hooks/general/useCommonFilters";
import useOfferRange from "../../components/hooks/merchants/offers/useOfferRange";
import CustomTableRow from "../../components/Table/TableRow";
import { useTheme } from "@emotion/react";
import { tokens } from "../../Theme";
import RowIdentifier from "../../components/Table/rowIdentifier";
import { TableCell } from "@mui/material";
import DateCell from "../../components/Table/DateCell";
import ActionsButtonsTable from "../../components/Table/ActionsButtonsTable";
import { useNavigate } from "react-router-dom";
import authFetch from "../../services/interceptors";
import { toast } from "react-toastify";
import FilterContainer from "../../components/filters/FilterContainer";

const sortArray = ["createdAt", "lowestPrice"];
const columns = [
  { id: "id", label: "Id" },
  { id: "lowest price", label: "Lowest Price" },
  { id: "highest price", label: "Highest Price" },
  { id: "created_at", label: "Created_At" },
];

function OfferRangeDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { page, handleChangePage, handleChangeRowsPerPage, rowsPerPage } =
    usePage();
  const {
    sort,
    orderBy,
    handleOrderByChange,
    resetCommonFilters,
    handleSortChange,
  } = useCommonFilters();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { count, getOfferRange, offferRange } = useOfferRange({
    orderBy,
    page,
    rowsPerPage,
    setError,
    setLoading,
    sort,
  });

  const handleRestFilters = () => {
    resetCommonFilters();
  };
  // const viewAction = (id) => {
  //   return () => {
  //     navigate(`/OfferRanges/${id}`);
  //   };
  // };
  const handleDeleteOfferRange = (id) => {
    return async () => {
      try {
        const res = await authFetch.delete("/offerrange/" + id);
        if (res.status === 200) {
          getOfferRange();
          toast.success("Deleted successfully");
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
  };
  const addNavFilter = () => {
    navigate(`/OfferRanges/add-new`);
  };
  return (
    <CustomContainer title={"Bogo ranges"} subtitle={"managing offer ranges!"}>
      <FilterContainer
        handleRestFilters={handleRestFilters}
        name={"Range"}
        theme={theme}
        colors={colors}
        handleSortChange={handleSortChange}
        sort={sort}
        handleOrderByChange={handleOrderByChange}
        orderBy={orderBy}
        sortArray={sortArray}
        commonmodel={"true"}
        addNav={addNavFilter}
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
        model={offferRange}
      >
        {offferRange?.map((row, index) => {
          return (
            <CustomTableRow colors={colors} key={row.id}>
              <RowIdentifier>{row?.id}</RowIdentifier>
              <TableCell>{row?.lowestPrice} </TableCell>
              <TableCell>{row?.highestPrice}</TableCell>
              <DateCell date={row.createdAt} />
              <ActionsButtonsTable
                deleteAction={handleDeleteOfferRange(row?.id)}
                // viewAction={viewAction(row?.id)}
                colors={colors}
              />
            </CustomTableRow>
          );
        })}
      </TableCard>
    </CustomContainer>
  );
}

export default OfferRangeDashboard;
