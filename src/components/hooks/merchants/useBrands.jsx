import axios from "axios";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [brands, setBrands] = useState([]);
  const getBrands = async () => {
    setLoading(true);
    try {
      const brands = await axios.get(
        `${process.env.REACT_APP_API_URL}/brand?limit=${rowsPerPage}&page=${
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
  useEffect(() => {
    navigate({
      search: `?${createSearchParams({
        rowsPerPage,
        page,
        sort,
        orderBy,
        search,
        preferences: [preferencesFilter],
      })}`,
    });
    getBrands();
  }, [rowsPerPage, page, count, sort, orderBy, search, preferencesFilter]);
  return { brands, count, getBrands };
}

export default useBrands;
