import {  useMediaQuery } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";

function ToastMessage({ direction }) {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    
      <ToastContainer
        position={"bottom-right"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        // closeOnClick
        rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        theme="dark"
        style={{
          marginLeft: matches ? "30px" : "",
          marginBottom: matches ? "20px" : "",
          width: matches ? "60%" : "",
        }}
      />
   
  );
}

export default ToastMessage;
