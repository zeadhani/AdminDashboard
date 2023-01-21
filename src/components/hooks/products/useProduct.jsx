import axios from "axios";
import { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,

} from "react-router-dom";

function useProduct(
  rowsPerPage,
  page,
  sort,
  orderBy,
  search,
  filtered,
  filteredGneder,
  filteredBrand,
  setLoading,
  setError
) {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState();
  const navigate = useNavigate();
  const getProducts = async () => {
    setLoading(true);
    try {
      const products = await axios.get(
        `${process.env.REACT_APP_API_URL}/products?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}&filter=${filtered}&gender=${filteredGneder}&brand=${filteredBrand}`
      );
      setProducts(products.data.data.data);
      setCount(products.data.data.totalCount);
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
        gender: filteredGneder,
        brand: [filteredBrand],
        filtered: [filtered],
      })}`,
    });
    getProducts();
  }, [
    rowsPerPage,
    page,
    count,
    sort,
    orderBy,
    search,
    filtered,
    filteredGneder,
    filteredBrand,
  ]);

  return { products ,count ,getProducts};
}

export default useProduct;
