import { FormControl, InputLabel, Select, Typography } from "@mui/material";
import React from "react";

function CustomSelect(props) {
  const {
    label,
    onChange,
    value,
    children,
    name,
    error,
    editable = true,
  } = props;
  return (
    <FormControl sx={{ minWidth: "150px" }} {...props}>
      {!value?.length && (
        <InputLabel sx={{ color: error ? "red" : "white" }}>{label}</InputLabel>
      )}
      <Select
        name={name}
        variant={editable ? "filled" : "standard"}
        value={value}
        multiple
        onChange={editable && onChange}
        error={value?.length === 0 && error}
      >
        {children}
      </Select>
      {value?.length === 0 && error && (
        <Typography variant="body2" color={"red"} mt={1} ml={1}>
          You must have at least one category
        </Typography>
      )}
    </FormControl>
  );
}

export default CustomSelect;
