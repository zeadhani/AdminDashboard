import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import CustomTextField from "./CustomTextField";

function CustomDateSelector({ dateValue, setDateValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Contract Expire Date"
        inputFormat="YYYY/MM/DD"
        value={dateValue}
        onChange={(value) => setDateValue(value)}
        renderInput={(params) => <CustomTextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default CustomDateSelector;
