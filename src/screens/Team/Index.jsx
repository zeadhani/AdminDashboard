import { Box, Button } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import { useTheme } from "@mui/system";
import { tokens } from "../../Theme";
import { mockDataTeam } from "../../data/mockData";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
function TeamDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "access",
      headerName: "Role",
      headerAlign: "left",
      align: "left",
    },
    {
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      justifyContent: "space-around",
      flex: 1,
      minWidth: 200,
      sortable: false,
      hideable: false,
      renderCell: ({ row: { id } }) => {
        return (
          <Box display={"flex"} justifyContent={"space-around"} width={"80%"}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.redAccent[600],
                borderRadius: "5px",
              }}
              onClick={() => alert(id)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.blueAccent[600],
                borderRadius: "5px",
              }}
              onClick={() => alert(id)}
            >
              Edit
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box mx="20px">
      <Header title={"TEAM MEMBERS"} subtitle={"Managing the team members!"} />
      <Table rowData={mockDataTeam} ColumnData={columns} />
    </Box>
  );
}

export default TeamDashboard;
