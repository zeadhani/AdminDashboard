import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function CustomFilter(props) {
  const { label, value, onChange, filterArray, multiple, itemItself } = props;
  return (
    <FormControl sx={{ minWidth: "150px" }} {...props}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        multiple={multiple}
        onChange={onChange}
      >
        {filterArray.map((item) => (
          <MenuItem
            key={itemItself ? item : item.id}
            value={itemItself ? item : item.name}
          >
            {itemItself ? item : item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomFilter;
