import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function CustomFilter(props) {
  const {
    label,
    value,
    onChange,
    filterarray,
    multiple,
    itemitself,
    commonmodel = false,
  } = props;
  return (
    <FormControl
      sx={{ minWidth: !commonmodel && "150px", flex: commonmodel && 1 }}
      {...props}
    >
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        multiple={multiple}
        onChange={onChange}
      >
        {filterarray?.map((item) => (
          <MenuItem
            key={itemitself ? item : item.id}
            value={itemitself ? item : item.name}
          >
            {itemitself ? item : item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomFilter;
