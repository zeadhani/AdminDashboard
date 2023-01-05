import { Search } from "@mui/icons-material";
import { Box, FormControl, IconButton, InputBase } from "@mui/material";
import React from "react";

function SearchFilter({ colors, search, handleSearchChange }) {
  return (
    <FormControl sx={{ minWidth: "200px" }}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="6px"
        height={"55px"}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
        <IconButton type="button" sx={{ p: 1 }} disableRipple>
          <Search />
        </IconButton>
      </Box>
    </FormControl>
  );
}

export default SearchFilter;
