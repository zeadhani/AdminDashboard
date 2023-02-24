import { TableCell } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function TableImage({image}) {
  return (
    <TableCell>
      <LazyLoadImage
        height={40}
        style={{ borderRadius: 5 }}
        // src={`${process.env.REACT_APP_DRIVE_URL}${image}`}
        src={`${process.env.REACT_APP_CLOUDINARY}${image}`}
      />
    </TableCell>
  );
}

export default TableImage;
