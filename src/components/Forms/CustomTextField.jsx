import { TextField } from "@mui/material";
import React from "react";

function CustomTextField(props) {
  const {
    label,
    name,
    handleBlur,
    handleChange,
    value,
    type,
    children,
    errors,
    touched,
  } = props;
  return (
    <TextField
      fullWidth
      variant="filled"
      type={type}
      label={label}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
      name={name}
      error={!!touched && !!errors}
      helperText={touched && errors}
      {...props}
    >
      {children}
    </TextField>
  );
}

export default CustomTextField;
