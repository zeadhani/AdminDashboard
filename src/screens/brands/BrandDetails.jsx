import { useTheme } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useImage from "../../components/hooks/general/useImage";

function BrandDetails() {
  let { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { editable } = state;
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const [add, setAdd] = useState();
  const {
    handleImageUpload,
    imageFile,
    imageFileerror,
    resetImageFile,
    changeImageFileError,
  } = useImage();
  return <div>{editable && "zzz"}</div>;
}

export default BrandDetails;
