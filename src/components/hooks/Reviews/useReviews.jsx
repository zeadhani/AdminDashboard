
import { useState } from "react";
import { useEffect } from "react";
import authFetch from "../../../services/interceptors";
import { useRef } from "react";

function useReviews({
  setLoading,
  setError,
  rowsPerPage,
  page,
  sort,
  orderBy,
  id,
  search
}) {
  const [count, setCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const initialRender = useRef(true);
  const getReviews = async () => {
    setLoading(true)
    try {
      const reviewsData = await authFetch.get(
        `/review?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&productId=${id}&search=${search}`
      );

      setReviews(reviewsData.data.data.data);
      setCount(reviewsData.data.data.totalCount);
      setError(false);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  const url = new URL(window.location);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      url.searchParams.set("rowsPerPage", rowsPerPage);
      url.searchParams.set("page", page);
      url.searchParams.set("sort", sort);
      url.searchParams.set("orderBy", orderBy);
      window.history.pushState({}, "", url);
    }
    getReviews();
  }, [rowsPerPage, page, sort, orderBy,search]);
  return { reviews, count, getReviews };
}

export default useReviews;
