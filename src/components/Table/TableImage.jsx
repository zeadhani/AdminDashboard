import { TableCell } from "@mui/material";
import React from "react";

function TableImage({image}) {
  return (
    <TableCell>
      <img
        width={40}
        style={{ borderRadius: 5 }}
        src={`https://drive.google.com/uc?export=view&id=${image}`}
      />
    </TableCell>
  );
}

export default TableImage;
