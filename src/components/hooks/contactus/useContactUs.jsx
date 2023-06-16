import { useEffect, useState } from "react";
import authFetch from "../../../services/interceptors";

function useContactUs(
  setLoading,
  rowsPerPage,
  page,
  sort,
  orderBy,
  search,
  setError,
  repliedFilter
) {
  const [count, setCount] = useState(0);
  const [contactUs, setContactUs] = useState([]);
  const getcontactUs = async () => {
    setLoading(true);
    try {
      const emails = await authFetch.get(
        `/contactus?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}&replied=${repliedFilter}`
      );
      setContactUs(emails.data.data.data);
      setCount(emails.data.data.totalCount);
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
    url.searchParams.set("replied", [repliedFilter]);
    window.history.pushState({}, "", url);
    getcontactUs();
  }, [rowsPerPage, page, sort, orderBy, search, repliedFilter]);
  return { contactUs, count, getcontactUs, setContactUs };
}

export default useContactUs;
