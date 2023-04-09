import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function useRequestFilter() {
  const [searchParams] = useSearchParams();
  const [filteredRequest, setFilteredRequest] = useState(
    searchParams.get("request") ? searchParams.get("request") : ""
  );
  const handleFilterRequest = (e) => {
    setFilteredRequest(e.target.value);
  };
  const resetRequestsFilter = () => {
    setFilteredRequest("");
  };
  return { filteredRequest, resetRequestsFilter, handleFilterRequest };
}

export default useRequestFilter;
