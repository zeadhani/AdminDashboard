import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

import { TextField } from "@mui/material";

function CustomDateSelector({ dateValue, setDateValue, editable }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Contract Expire Date"
        inputFormat="YYYY/MM/DD"
        value={dateValue}
        onChange={(value) => setDateValue(value)}
        renderInput={(params) => (
          <TextField variant={editable ? "filled" : "standard"} {...params} />
        )}
      />
    </LocalizationProvider>
  );
}

export default CustomDateSelector;
