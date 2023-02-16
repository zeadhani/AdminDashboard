import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
  useEffect(() => {
    navigate({
      search: `?${createSearchParams({
        rowsPerPage,
        page,
        sort,
        orderBy,
        search,
        brand: [filteredBrand],
      })}`,
    });
    getOrders();
  }, [rowsPerPage, page, sort, orderBy, search, filteredBrand]);
  return { orders, count, getOrders };
}

export default useOrders;
