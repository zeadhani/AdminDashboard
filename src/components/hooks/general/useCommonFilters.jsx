import  { useState } from "react";
import { useSearchParams } from "react-router-dom";

function useCommonFilters() {
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState(
    searchParams.get("sort") ? searchParams.get("sort") : "createdAt"
  );
  const [search, setSearch] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );
  const [orderBy, setOrderBy] = useState(
    searchParams.get("orderBy") ? searchParams.get("orderBy") : "asc"
  );
  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };
  const resetCommonFilters = () => {
    setOrderBy("asc");
    setSort("createdAt");
    setSearch("");
  };
  return {
    handleSortChange,
    handleOrderByChange,
    handleSearchChange,
    sort,
    search,
    orderBy,
    resetCommonFilters,
  };
}

export default useCommonFilters;
