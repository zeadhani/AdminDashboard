import React from "react";
import CustomContainer from "../global/CustomContainer";
import FilterContainer from "../../components/filters/FilterContainer";
import CustomFilter from "../../components/filters/CustomSingleFilter";
import { TableCell, useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import { useNavigate } from "react-router-dom";
import usePage from "../../components/hooks/general/usePage";
import useCommonFilters from "../../components/hooks/general/useCommonFilters";
import useUserFilters from "../../components/hooks/users/useUserFilters";
import { useState } from "react";
import LinearProg from "../../components/global/LinearProg";
import { Box } from "@mui/system";
import useUsers from "../../components/hooks/users/useUsers";
import TableCard from "../../components/Table/TableCard";
import CustomTableRow from "../../components/Table/TableRow";
import RowIdentifier from "../../components/Table/rowIdentifier";
import TableImage from "../../components/Table/TableImage";
import DateCell from "../../components/Table/DateCell";
import ActionsButtonsTable from "../../components/Table/ActionsButtonsTable";
import authFetch from "../../services/interceptors";

const sortArray = ["createdAt", "name"];
const columns = [
  { id: "first name", label: "First Name" },
  { id: "last name", label: "Last Name" },
  { id: "image", label: "Image" },
  { id: "email", label: "Email" },
  { id: "verified", label: "verified" },
  { id: "created_at", label: "Created_At" },
];
function UserDashbaord() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { page, handleChangePage, handleChangeRowsPerPage, rowsPerPage } =
    usePage();
  const {
    VerifiedArray,
    handleFilterVerifiedChange,
    resetUserFilter,
    verifiedFilter,
  } = useUserFilters();
  const {
    sort,
    search,
    orderBy,
    handleOrderByChange,
    handleSearchChange,
    resetCommonFilters,
    handleSortChange,
  } = useCommonFilters();
  const { count, getUsers, users, setUsers } = useUsers(
    setLoading,
    rowsPerPage,
    page,
    sort,
    orderBy,
    search,
    setError,
    verifiedFilter
  );
  const handleTitleClick = () => {
    navigate("/Users/add-user");
  };
  const handleRestFilters = () => {
    resetUserFilter();
    resetCommonFilters();
  };
  const viewAction = (id) => {
    return () => {
      navigate(`/Users/${id}`, {
        state: { editable: false.toString() },
      });
    };
  };
  const handleDeleteUser = (id) => { 
    return async (e) => {
      setLoading(true);
      try {
        await authFetch.delete(`/user/${id}`);
        getUsers();
        setError(false);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
  };
  const verifyAction = (id, verified) => {
    return async (e) => {
      setLoading(true);
      const updateServer = await authFetch.patch(
        `/user/verify/${id}?verifyQuery=${verified}`
      );

      if (updateServer.status !== 200) return;
      const data = [...users];
      const newData = data.map((item) => {
        if (item.id === id) {
          return { ...item, verified };
        }
        return item;
      });
      setUsers(newData);
      setLoading(false);
    };
  };
  return (
    <CustomContainer title={"BOGO USERS"} subtitle={"Managing bogo users!"}>
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
      >
        <CustomFilter
          label={"Verified"}
          value={verifiedFilter}
          filterarray={VerifiedArray}
          itemitself="true"
          onChange={handleFilterVerifiedChange}
          sx={{ flex: 1 }}
        />
      </FilterContainer>
      <LinearProg loading={loading} />
      {error && <Box p={2}>Error , could not fetch data</Box>}
      {users.length === 0 && !error && !loading && (
        <Box p={2}>No items Found</Box>
      )}
      {users?.length > 0 && (
        <TableCard
          columns={columns}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        >
          {!error &&
            users.map((row, index) => (
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
                  deleteAction={handleDeleteUser(row?.id)}
                  viewAction={viewAction(row?.id)}
                  colors={colors}
                  anotherAction={verifyAction(row?.id, row.verified ? 0 : 1)}
                  anotherActionName={row.verified ? "UnVerify" : "Verify"}
                />
              </CustomTableRow>
            ))}
        </TableCard>
      )}
    </CustomContainer>
  );
}

export default UserDashbaord;
