import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function useProductFilters() {
  const [searchParams] = useSearchParams();
  const [filtered, setFiltered] = useState(
    searchParams.get("filtered") ? searchParams.get("filtered").split(",") : []
  );
  const [filteredStock, setFilteredStock] = useState(
    searchParams.get("stock") ? searchParams.get("stock") : ""
  );
  const [filteredGneder, setFilteredGender] = useState(
    searchParams.get("gender") ? searchParams.get("gender") : ""
  );
  const [filteredBrand, setfilteredBrand] = useState(
    searchParams.get("brand") ? searchParams.get("brand").split(",") : []
  );
  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setFiltered(typeof value === "string" ? value.split(",") : value);
  };
  const handleFilterGenderChange = (e) => {
    setFilteredGender(e.target.value);
  };
  const handleFilterStockChange = (e) => {
    setFilteredStock(e.target.value);
  };
  const handleFilterBrandChange = (e) => {
    const {
      target: { value },
    } = e;
    setfilteredBrand(typeof value === "string" ? value.split(",") : value);
  };
  const resetProductFilters = () => {
    setFiltered([]);
    setfilteredBrand([]);
    setFilteredGender("");
    setFilteredStock("");
  };
  return {
    filtered,
    filteredGneder,
    filteredBrand,
    filteredStock,
    handleFilterBrandChange,
    handleFilterChange,
    handleFilterGenderChange,
    resetProductFilters,
    handleFilterStockChange,
  };
}

export default useProductFilters;
