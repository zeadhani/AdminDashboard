import React, { useState } from "react";
import CustomContainer from "../global/CustomContainer";
import TableCard from "../../components/Table/TableCard";
import useHomeSlider from "../../components/hooks/homeslider/useHomeSlider";
import { useTheme } from "@emotion/react";
import { tokens } from "../../Theme";
import { useNavigate } from "react-router-dom";
import usePage from "../../components/hooks/general/usePage";
import CustomTableRow from "../../components/Table/TableRow";
import RowIdentifier from "../../components/Table/rowIdentifier";
import TableImage from "../../components/Table/TableImage";
import { Box, TableCell } from "@mui/material";
import ActionsButtonsTable from "../../components/Table/ActionsButtonsTable";

const columns = [
  { id: "id", label: "Id" },
  { id: "image", label: "Image" },
  { id: "title", label: "Title" },
];
function HomeSliderDashboard() {
  const [loading, setLoading] = useState();
  const { data, count, error } = useHomeSlider({ setLoading });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { page, handleChangePage, handleChangeRowsPerPage, rowsPerPage } =
    usePage();
  const editAction = (id) => {
    return () => {
      navigate(`/home-slider/${id}`);
    };
  };
  return (
    <CustomContainer
      title={"bogo homeslider"}
      subtitle={"managing homeslider!"}
    >
      <Box mt={2} />
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
              <RowIdentifier>{row?.id}</RowIdentifier>
              <TableImage image={row?.image} />
              <TableCell>{row?.title}</TableCell>
              <ActionsButtonsTable
                editAction={editAction(row?.id)}
                colors={colors}
              />
            </CustomTableRow>
          );
        })}
      </TableCard>
    </CustomContainer>
  );
}

export default HomeSliderDashboard;
