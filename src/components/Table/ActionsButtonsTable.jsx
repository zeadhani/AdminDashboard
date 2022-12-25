import { Box, Button, TableCell } from "@mui/material";
import React from "react";

function ActionsButtonsTable({ deleteAction, editAction, viewAction, colors }) {
  return (
    <TableCell sx={{ textAlign: "center" }}>
      <Box display={"flex"} justifyContent={"center"}>
        {deleteAction && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.redAccent[600],
              borderRadius: "5px",
            }}
            onClick={deleteAction}
          >
            Delete
          </Button>
        )}
        {editAction && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[600],
              borderRadius: "5px",
              marginX: "5px",
            }}
            onClick={editAction}
          >
            Edit
          </Button>
        )}
        {viewAction && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              borderRadius: "5px",
            }}
            onClick={viewAction}
          >
            View
          </Button>
        )}
      </Box>
    </TableCell>
  );
}

export default ActionsButtonsTable;
