import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import authFetch from "../../../services/interceptors";

function useUsers({
  setLoading,
  rowsPerPage,
  page,
  sort,
  orderBy,
  search,
  setError,
  verifiedFilter,
  team,
}) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    setLoading(true);
    try {
      const brands = await authFetch.get(
        `/user?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}&verified=${verifiedFilter}&${
          team ? "team=true" : ""
        }`
      );
      setUsers(brands.data.data.data);
      setCount(brands.data.data.totalCount);
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
    url.searchParams.set("verified", verifiedFilter);
    window.history.pushState({}, "", url);
    getUsers();
  }, [rowsPerPage, page, sort, orderBy, search, verifiedFilter]);
  return { users, count, getUsers, setUsers };
}

export default useUsers;
