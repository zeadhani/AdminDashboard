/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import authFetch from "../../../services/interceptors";
import { useEffect } from "react";

function useModel(
  setLoading,
  rowsPerPage,
  page,
  sort,
  orderBy,
  search,
  setError,
  dataModel
) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [data, setData] = useState();
  const getData = async () => {
    setLoading(true);
    try {
      const brands = await authFetch.get(
        `/${dataModel}/paginate?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}`
      );
      setData(brands.data.data.data);
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
      })}`,
    });
    getData();
  }, [rowsPerPage, page, sort, orderBy, search]);
  return { data, getData, count };
}

export default useModel;
