import React, { useReducer } from "react";
import authFetch from "../../../services/interceptors";
import { useRef } from "react";
import { useEffect } from "react";
const initialState = {
  products: [],
  count: 0,
  data: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_FETCH_DATA_SUCCESS": {
      return {
        ...state,
        data: action.payload.data,
        products: action.payload.products,
        count: action.payload.count,
      };
    }
    case "UPDATE_DATA": {
      return {
        ...state,
        products: action.payload.products,
      };
    }
    default:
      throw new Error("Unexpected action");
  }
};
function useProductsData({
  rowsPerPage,
  page,
  sort,
  orderBy,
  search,
  filtered,
  filteredBrand,
  setLoading,
  setError,
  filteredStock,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialRender = useRef(true);
  const getInitialData = async () => {
    setLoading(true);
    try {
      const [filterData, products] = await Promise.all([
        authFetch.get("/products/filter/all"),
        authFetch.get(
          `/products?limit=${rowsPerPage}&page=${
            page + 1
          }&sort=${sort},${orderBy}&search=${search}&filter=${filtered}&stock=${filteredStock}&brand=${filteredBrand}`
        ),
      ]);
      dispatch({
        type: "INITIAL_FETCH_DATA_SUCCESS",
        payload: {
          data: filterData.data,
          products: products.data.data.data,
          count: products.data.data.totalCount,
        },
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const getUpdatedData = async () => {
    setLoading(true);
    try {
      const products = await authFetch.get(
        `/products?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}&filter=${filtered}&stock=${filteredStock}&brand=${filteredBrand}`
      );
      dispatch({
        type: "UPDATE_DATA",
        payload: {
          products: products.data.data.data,
        },
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const url = new URL(window.location);
      url.searchParams.set("rowsPerPage", rowsPerPage);
      url.searchParams.set("page", page);
      url.searchParams.set("sort", sort);
      url.searchParams.set("orderBy", orderBy);
      url.searchParams.set("search", search);
      url.searchParams.set("stock", filteredStock);
      url.searchParams.set("brand", [filteredBrand]);
      url.searchParams.set("filtered", [filtered]);

      window.history.pushState({}, "", url);
      getUpdatedData();
    }
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
  return {
    data: state?.data,
    products: state?.products,
    count: state?.count,
    getProducts: getUpdatedData,
  };
}

export default useProductsData;
