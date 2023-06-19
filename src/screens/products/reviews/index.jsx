import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomContainer from "../../global/CustomContainer";
import { Box, TableCell, Typography, useTheme } from "@mui/material";
import CustomTableRow from "../../../components/Table/TableRow";
import RowIdentifier from "../../../components/Table/rowIdentifier";
import DateCell from "../../../components/Table/DateCell";
import ActionsButtonsTable from "../../../components/Table/ActionsButtonsTable";
import TableCard from "../../../components/Table/TableCard";
import { tokens } from "../../../Theme";
import usePage from "../../../components/hooks/general/usePage";
import useCommonFilters from "../../../components/hooks/general/useCommonFilters";
import { useState } from "react";
import useReviews from "../../../components/hooks/Reviews/useReviews";
import FilterContainer from "../../../components/filters/FilterContainer";
import authFetch from "../../../services/interceptors";
import { toast } from "react-toastify";
import Dialogue from "../../../components/global/Dialogue";

const sortArray = ["createdAt", "rating"];
const columns = [
  { id: "email", label: "Email" },
  { id: "rating", label: "Rating" },
  { id: "comment", label: "Comment" },
  { id: "created_at", label: "Created_At" },
];
function ReviewsDashboard() {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { page, handleChangePage, handleChangeRowsPerPage, rowsPerPage } =
    usePage();
  const {
    sort,
    orderBy,
    handleOrderByChange,
    handleSearchChange,
    search,
    resetCommonFilters,
    handleSortChange,
  } = useCommonFilters();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const { count, reviews, getReviews } = useReviews({
    orderBy,
    page,
    rowsPerPage,
    setError,
    setLoading,
    sort,
    id,
    search,
  });

  const handleRestFilters = () => {
    resetCommonFilters();
  };
  const addNavFilter = () => {
    navigate(`/review/details/:id`);
  };

  const viewAction = (comment) => {
    return () => {
      setComment(comment);
      setOpen(true);
    };
  };
  const handleDeleteOfferRange = (id) => {
    return async () => {
      try {
        const res = await authFetch.delete("/review/" + id);
        if (res.status === 200) {
          getReviews();
          toast.success("Deleted successfully");
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
  };
  const hanldeClose = () => {
    setOpen(false);
    setComment("");
  };
  return (
    <CustomContainer
      title={"Bogo Reviews"}
      subtitle={"managing product reviews!"}
    >
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
        searchLabel={"Search By user Email"}
        handleSearchChange={handleSearchChange}
        search={search}
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
        model={reviews}
      >
        {reviews?.map((row, index) => {
          return (
            <CustomTableRow colors={colors} key={row.id}>
              <RowIdentifier>{row?.Users?.email}</RowIdentifier>
              <TableCell>{row?.rating} </TableCell>
              <TableCell sx={{ maxWidth: "100px", overflow: "hidden" }}>
                <Box
                  sx={{
                    display: "inline-block",
                    maxWidth: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row?.comment}
                </Box>
              </TableCell>
              <DateCell date={row.createdAt} />
              <ActionsButtonsTable
                deleteAction={handleDeleteOfferRange(row?.id)}
                viewAction={viewAction(row?.comment)}
                colors={colors}
              />
            </CustomTableRow>
          );
        })}
      </TableCard>

      <Dialogue
        open={open}
        onClose={hanldeClose}
        title={"Review"}
        theme={theme}
        colors={colors}
      >
        <Typography>{comment}</Typography>
      </Dialogue>
    </CustomContainer>
  );
}

export default ReviewsDashboard;
