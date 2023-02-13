import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const VerifiedArray = ["verified", "notverified"];
function useUserFilters() {
  const [searchParams] = useSearchParams();
  const [verifiedFilter, setVerifiedFilter] = useState(
    searchParams.get("verified") ? searchParams.get("verified") : ""
  );
  const handleFilterVerifiedChange = (e) => {
    setVerifiedFilter(e.target.value);
  };
  const resetUserFilter = () => {
    setVerifiedFilter("");
  };
  return {
    VerifiedArray,
    resetUserFilter,
    handleFilterVerifiedChange,
    verifiedFilter,
  };
}

export default useUserFilters;
