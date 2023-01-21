import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function useSort() {
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState(
    searchParams.get("sort") ? searchParams.get("sort") : "createdAt"
  );
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };
  return { sort, handleSortChange ,setSort};
}

export default useSort;
