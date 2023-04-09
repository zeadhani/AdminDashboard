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
    const url = new URL(window.location);
    url.searchParams.set("rowsPerPage", rowsPerPage);
    url.searchParams.set("page", page);
    url.searchParams.set("sort", sort);
    url.searchParams.set("orderBy", orderBy);
    url.searchParams.set("search", search);
    window.history.pushState({}, "", url);
    getData();
  }, [rowsPerPage, page, sort, orderBy, search]);
  return { data, getData, count };
}

export default useModel;
