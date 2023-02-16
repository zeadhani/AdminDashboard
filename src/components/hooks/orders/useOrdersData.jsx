import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function useBrandFilters() {
  const [searchParams] = useSearchParams();
  const [filteredBrand, setfilteredBrand] = useState(
    searchParams.get("brand") ? searchParams.get("brand").split(",") : []
  );

  const resetBrandFilters = () => {
    setfilteredBrand([]);
  };
  const handleFilterBrandChange = (e) => {
    const {
      target: { value },
    } = e;
    setfilteredBrand(typeof value === "string" ? value.split(",") : value);
  };
  return { filteredBrand, handleFilterBrandChange, resetBrandFilters };
}

export default useBrandFilters;
