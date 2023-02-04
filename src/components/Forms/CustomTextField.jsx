import { TextField } from "@mui/material";
import { Field } from "formik";
import React from "react";

function CustomTextField(props) {
  const {
    label,
    name,
    // handleBlur,
    // handleChange,
    value,
    type,
    children,
    errors,

    disabled,
    touched,
    select = false,
    variant,
  } = props;

  return (
    // <Field
    //   fullWidth
    //   variant="filled"
    //   type={type}
    //   label={label}
    //   // onBlur={handleBlur}
    //   // onChange={handleChange}
    //   as={TextField}
    //   value={value}
    //   name={name}
    //   error={!!touched && !!errors}
    //   helperText={touched && errors}
    //   {...props}
    // >
    //   {children}
    // </Field>
    <Field
      name={name}
      type={type}
      as={TextField}
      variant={variant || "filled"}
      label={label}
      fullWidth
      error={Boolean(errors) && Boolean(touched)}
      helperText={Boolean(touched) && errors}
      disabled={disabled}
      select={select}
      // SelectProps={{
      //   // multiple: true,
      //   value: [],
      // }}
    >
      {children}
    </Field>
  );
}

export default CustomTextField;
