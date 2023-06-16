import { useEffect, useState } from "react";
import authFetch from "../../../services/interceptors";

function useBrands(
  setLoading,
  rowsPerPage,
  page,
  sort,
  orderBy,
  search,
  setError,
  preferencesFilter
) {
  const [count, setCount] = useState(0);
  const [brands, setBrands] = useState([]);
  const getBrands = async () => {
    setLoading(true);

    try {
      const brands = await authFetch.get(
        `/brand?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}&filter=${preferencesFilter}`
      );
      setBrands(brands.data.data.data);
      setCount(brands.data.data.totalCount);
      setError(false);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  const url = new URL(window.location);
  useEffect(() => {
    url.searchParams.set("rowsPerPage", rowsPerPage);
    url.searchParams.set("page", page);
    url.searchParams.set("sort", sort);
    url.searchParams.set("orderBy", orderBy);
    url.searchParams.set("search", search);
    url.searchParams.set("preferences", [preferencesFilter]);
    window.history.pushState({}, "", url);
    getBrands();
  }, [rowsPerPage, page, sort, orderBy, search, preferencesFilter]);
  return { brands, count, getBrands };
}

export default useBrands;
