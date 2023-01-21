import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

function useBrandFilters() {
  const [searchParams] = useSearchParams();
  const [preferencesFilter, setPrefFilter] = useState(
    searchParams.get("preferences")
      ? searchParams.get("preferences").split(",")
      : []
  );
  const handleFilterPrefChange = (e) => {
    const {
      target: { value },
    } = e;
    setPrefFilter(typeof value === "string" ? value.split(",") : value);
  };
  const resetBrandFilters = () => {
    setPrefFilter([]);
  };
  return { preferencesFilter, handleFilterPrefChange, resetBrandFilters };
}

export default useBrandFilters;
