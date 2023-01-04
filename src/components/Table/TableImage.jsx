import { TableCell } from "@mui/material";
import React from "react";

function TableImage({image}) {
  return (
    <TableCell>
      <img
        height={40}
        style={{ borderRadius: 5 }}
        src={`${process.env.REACT_APP_DRIVE_URL}${image}`}
      />
    </TableCell>
  );
}

export default TableImage;
