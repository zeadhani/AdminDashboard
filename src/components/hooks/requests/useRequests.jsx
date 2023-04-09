import { useState } from "react";
import authFetch from "../../../services/interceptors";
import { useEffect } from "react";
import { useRef } from "react";

function useRequests({
  rowsPerPage,
  page,
  sort,
  orderBy,
  search,
  setLoading,
  setError,
  filteredRequest,
}) {
  const [requests, setRequests] = useState([]);
  const [count, setCount] = useState();

  const getRequests = async () => {
    setLoading(true);
    try {
      const productsData = await authFetch.get(
        `/request?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}&status=${filteredRequest}`
      );
      setRequests(productsData.data.data.data);
      setCount(productsData.data.data.totalCount);
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
    url.searchParams.set("status", filteredRequest);
    window.history.pushState({}, "", url);
    getRequests();
  }, [rowsPerPage, page, sort, orderBy, search, filteredRequest]);
  return { requests, count, getRequests };
}

export default useRequests;
