import { TableCell } from "@mui/material";
import React from "react";

function RowIdentifier({ children }) {
  return (
    <TableCell
      sx={{
        fontWeight: "bold",
        textTransform: "capitalize",
      }}
    >
      {children}
    </TableCell>
  );
}

export default RowIdentifier;
