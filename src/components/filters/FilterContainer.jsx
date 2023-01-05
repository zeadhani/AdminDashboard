import { Button, Stack } from "@mui/material";
import React from "react";
import CommonFilterContainer from "./CommonFilterContainer";

function FilterContainer({
  children,
  theme,
  handleRestFilters,
  addNav,
  name,
  colors,
  search,
  handleSearchChange,
  handleSortChange,
  sort,
  handleOrderByChange,
  orderBy,
  sortArray,
}) {
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      spacing={3}
      sx={{
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Stack direction={"row"} spacing={2} width={"100%"}>
        <CommonFilterContainer
          colors={colors}
          search={search}
          handleSearchChange={handleSearchChange}
          handleSortChange={handleSortChange}
          sort={sort}
          handleOrderByChange={handleOrderByChange}
          orderBy={orderBy}
          sortArray={sortArray}
        />
        {children}
      </Stack>
      <Stack direction={"row"} spacing={1}>
        <Button
          variant={"outlined"}
          sx={{ height: "100%" }}
          color={theme.palette.mode === "dark" ? "info" : "warning"}
          onClick={handleRestFilters}
        >
          Reset Filters
        </Button>
        <Button
          variant="outlined"
          sx={{ height: "100%" }}
          color={theme.palette.mode === "dark" ? "secondary" : "primary"}
          onClick={addNav}
        >
          Add new {name}
        </Button>
      </Stack>
    </Stack>
  );
}

export default FilterContainer;
