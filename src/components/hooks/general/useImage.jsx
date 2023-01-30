import React from "react";
import { useState } from "react";
const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg"];
function useImage() {
  const [imageFile, setimageFile] = useState();
  const [imageFileerror, setimageFileerror] = useState("");
  const changeImageFileError = (text) => {
    setimageFileerror(text);
  };
  const resetImageFile = () => {
    setimageFile("");
  };
  const handleImageUpload = (e) => {
    setimageFileerror("");
    setimageFile(null);
    const file = e.target.files[0];

    if (!SUPPORTED_FORMATS.find((type) => type === file.type)) {
      setimageFileerror("Not Supported file type");
      return;
    }
    setimageFile(file);
  };
  return {
    handleImageUpload,
    imageFile,
    imageFileerror,
    resetImageFile,
    changeImageFileError,
  };
}

export default useImage;
