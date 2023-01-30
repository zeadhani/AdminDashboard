import React from "react";

function ImageFileDisplay({ imageFile, alt = "" }) {
  return (
    <>
      {imageFile && (
        <img
          alt={alt}
          width={80}
          style={{ borderRadius: 5 }}
          src={URL.createObjectURL(imageFile)}
        />
      )}
    </>
  );
}

export default ImageFileDisplay;
