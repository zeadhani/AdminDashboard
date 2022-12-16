import { Typography } from "@mui/material";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
function ProductDetails() {
  const { slug } = useParams();
  const { state } = useLocation();
  const { editable } = state;

  return <>{editable&&<Typography>zzz</Typography>}</>;
}

export default ProductDetails;
