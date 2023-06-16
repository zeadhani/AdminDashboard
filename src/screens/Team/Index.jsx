import React, { useState } from "react";
import CustomContainer from "../global/CustomContainer";
import { useTheme } from "@mui/system";
import { tokens } from "../../Theme";
import TableCard from "../../components/Table/TableCard";
import { useNavigate } from "react-router-dom";
import usePage from "../../components/hooks/general/usePage";
import useCommonFilters from "../../components/hooks/general/useCommonFilters";
import useUsers from "../../components/hooks/users/useUsers";
import CustomTableRow from "../../components/Table/TableRow";
import RowIdentifier from "../../components/Table/rowIdentifier";
import { TableCell } from "@mui/material";
import TableImage from "../../components/Table/TableImage";
import DateCell from "../../components/Table/DateCell";
import ActionsButtonsTable from "../../components/Table/ActionsButtonsTable";
import FilterContainer from "../../components/filters/FilterContainer";
const sortArray = ["createdAt", "name"];
const columns = [
  { id: "first name", label: "First Name" },
  { id: "last name", label: "Last Name" },
  { id: "image", label: "Image" },
  { id: "email", label: "Email" },
  { id: "verified", label: "verified" },
  { id: "created_at", label: "Created_At" },
];
function TeamDashboard() {
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
  const { count, users } = useUsers({
    setLoading,
    rowsPerPage,
    page,
    sort,
    orderBy,
    search,
    setError,
    team: "true",
  });
  const viewAction = (email) => {
    return () => {
      navigate(`/Users/details/${email}`);
    };
  };
  const handleRestFilters = () => {
    resetCommonFilters();
  };
  const handleTitleClick = () => {
    navigate("/Team/details");
  };
  return (
    <CustomContainer title={"Bogo team"} subtitle={"Managing bogo Team!"}>
      <FilterContainer
        handleRestFilters={handleRestFilters}
        name={"User"}
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
        searchLabel={"Search By Admin Email"}
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
        model={users}
      >
        {users?.map((row, index) => (
          <CustomTableRow colors={colors} key={row.id}>
            <RowIdentifier>{row.first_name}</RowIdentifier>
            <TableCell>{row.last_name}</TableCell>

            <TableImage image={row.image} />
            <TableCell>{row.email}</TableCell>
            <TableCell
              sx={{
                color: row.verified
                  ? colors.greenAccent[500]
                  : colors.redAccent[500],
                fontWeight: "bold",
              }}
            >
              {row.verified ? "Verified" : "Not Verified"}
            </TableCell>
            <DateCell date={row.createdAt} />
            <ActionsButtonsTable
              viewAction={viewAction(row?.email)}
              colors={colors}
            />
          </CustomTableRow>
        ))}
      </TableCard>
    </CustomContainer>
  );
}

export default TeamDashboard;
