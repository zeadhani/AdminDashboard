import {
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function CustomSelect(props) {
  const { label, onChange, value, children, name, error } = props;
 const editable = props.editable === "true";

  return (
    <FormControl sx={{ minWidth: "150px" }} {...props}>
      {!value?.length && (
        <InputLabel sx={{ color: error ? "red" : "white" }}>{label}</InputLabel>
      )}
      {editable && (
        <Box position={"relative"}>
          {value?.length > 0 && (
            <InputLabel sx={{ position: "absolute", top: "15px" }}>
              {label}
            </InputLabel>
          )}
          <Select
            fullWidth
            name={name}
            variant="filled"
            value={value}
            multiple
            onChange={onChange}
            error={value?.length === 0 && error}
          >
            {children}
          </Select>
        </Box>
      )}
      {!editable && (
        <TextField value={value} label={label} variant="standard" disabled />
      )}
      {value?.length === 0 && error && (
        <Typography variant="body2" color={"red"} mt={1} ml={1}>
          You must have at least one category
        </Typography>
      )}
    </FormControl>
  );
}

export default CustomSelect;
