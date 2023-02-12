import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import authFetch from "../../../services/interceptors";

function useProduct(
  rowsPerPage,
  page,
  sort,
  orderBy,
  search,
  filtered,
  filteredBrand,
  setLoading,
  setError,
  filteredStock
) {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState();
  const navigate = useNavigate();
  const getProducts = async () => {
    setLoading(true);
    try {
      const productsData = await authFetch.get(
        `/products?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}&filter=${filtered}&stock=${filteredStock}&brand=${filteredBrand}`
      );
      console.log("first")
      setProducts(productsData.data.data.data);
      setCount(productsData.data.data.totalCount);
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
        stock: filteredStock,
        brand: [filteredBrand],
        filtered: [filtered],
      })}`,
    });
    getProducts();
  }, [
    rowsPerPage,
    page,
    sort,
    orderBy,
    search,
    filtered,
    filteredStock,
    filteredBrand,
  ]);

  return { products, count, getProducts };
}

export default useProduct;


