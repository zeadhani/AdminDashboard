import { useState } from "react";
import authFetch from "../../../services/interceptors";
import { useEffect } from "react";

function useOrders(
  setLoading,
  rowsPerPage,
  page,
  sort,
  orderBy,
  search,
  setError,
  filteredBrand
) {
  const [count, setCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    setLoading(true);
    try {
      const ordersData = await authFetch.get(
        `/orders?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}&brands=${filteredBrand}`
      );

      setOrders(ordersData.data.data.data);
      setCount(ordersData.data.data.totalCount);
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
    url.searchParams.set("brand", [filteredBrand]);
    window.history.pushState({}, "", url);
    getOrders();
  }, [rowsPerPage, page, sort, orderBy, search, filteredBrand]);
  return { orders, count, getOrders };
}

export default useOrders;
