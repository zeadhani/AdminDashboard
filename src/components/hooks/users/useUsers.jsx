import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import authFetch from "../../../services/interceptors";

function useUsers(
  setLoading,
  rowsPerPage,
  page,
  sort,
  orderBy,
  search,
  setError,
  verifiedFilter
) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    setLoading(true);
    try {
      const brands = await authFetch.get(
        `/user?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}&verified=${verifiedFilter}`
      );
      setUsers(brands.data.data.data);
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
        verified: [verifiedFilter],
      })}`,
    });
    getUsers();
  }, [rowsPerPage, page, sort, orderBy, search, verifiedFilter]);
  return { users, count, getUsers,setUsers };
}

export default useUsers;
