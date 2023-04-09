import axios from "axios";
import { useRef } from "react";
import { useReducer } from "react";
import authFetch from "../../../services/interceptors";
import { useEffect } from "react";

const initialState = {
  pref: [],
  brands: [],
  count: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_FETCH_DATA_SUCCESS": {
      return {
        ...state,
        pref: action.payload.pref,
        brands: action.payload.brands,
        count: action.payload.count,
      };
    }
    case "UPDATE_DATA": {
      return {
        ...state,
        brands: action.payload.brands,
      };
    }
    default:
      throw new Error("Unexpected action");
  }
};
function useBrandsPage({
  setLoading,
  rowsPerPage,
  page,
  sort,
  orderBy,
  search,
  setError,
  preferencesFilter,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialRender = useRef(true);
  const getInitialData = async () => {
    try {
      const [filterData, brands] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/pref`),
        authFetch.get(
          `/brand?limit=${rowsPerPage}&page=${
            page + 1
          }&sort=${sort},${orderBy}&search=${search}&filter=${preferencesFilter}`
        ),
      ]);
      dispatch({
        type: "INITIAL_FETCH_DATA_SUCCESS",
        payload: {
          pref: filterData.data,
          brands: brands.data.data.data,
          count: brands.data.data.totalCount,
        },
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const getUpdatedData = async () => {
    const brands = await authFetch.get(
      `/brand?limit=${rowsPerPage}&page=${
        page + 1
      }&sort=${sort},${orderBy}&search=${search}&filter=${preferencesFilter}`
    );
    dispatch({
      type: "UPDATE_DATA",
      payload: {
        brands: brands.data.data.data,
      },
    });
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
      url.searchParams.set("preferences", [preferencesFilter]);
      window.history.pushState({}, "", url);
      getUpdatedData();
    }
  }, [rowsPerPage, page, sort, orderBy, search, preferencesFilter]);
  return {
    brands: state?.brands,
    count: state?.count,
    getBrands: getUpdatedData,
    pref: state?.pref,
  };
}

export default useBrandsPage;
