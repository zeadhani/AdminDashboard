import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
  useEffect(() => {
    navigate({
      search: `?${createSearchParams({
        rowsPerPage,
        page,
        sort,
        orderBy,
        search,
        replied: [repliedFilter],
      })}`,
    });
    getcontactUs();
  }, [rowsPerPage, page, sort, orderBy, search, repliedFilter]);
  return { contactUs, count, getcontactUs, setContactUs };
}

export default useContactUs;
