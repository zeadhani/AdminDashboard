import React from "react";
import SearchFilter from "./searchFilter";
import CustomFilter from "./CustomSingleFilter";

const orderByArray = ["asc", "desc"];
function CommonFilterContainer({
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
    <>
      <SearchFilter
        colors={colors}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <CustomFilter
        label={"Sort By"}
        filterarray={sortArray}
        onChange={handleSortChange}
        value={sort}
        multiple={false}
        itemitself="true"
      />
      <CustomFilter
        label={"Order By"}
        itemitself="true"
        filterarray={orderByArray}
        onChange={handleOrderByChange}
        value={orderBy}
      />
    </>
  );
}

export default CommonFilterContainer;
