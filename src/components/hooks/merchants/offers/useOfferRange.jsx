import { useEffect, useState } from "react";
import authFetch from "../../../../services/interceptors";

function useOfferRange({
  setLoading,
  setError,
  rowsPerPage,
  page,
  sort,
  orderBy,
}) {
  const [count, setCount] = useState(0);
  const [offferRange, setOfferRange] = useState([]);
  const getOfferRange = async () => {
    setLoading(true);
    try {
      const ordersData = await authFetch.get(
        `/offerrange?limit=${rowsPerPage}&page=${page + 1}&sort=${sort},${orderBy}`
      );

      setOfferRange(ordersData.data.data.data);
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
    window.history.pushState({}, "", url);
    getOfferRange();
  }, [rowsPerPage, page, sort, orderBy]);
  return { offferRange, count, getOfferRange };
}

export default useOfferRange;
