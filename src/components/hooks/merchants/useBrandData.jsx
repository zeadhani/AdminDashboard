import { useEffect } from "react";
import { useState } from "react";
import authFetch from "../../../services/interceptors";

function useBrandData() {
  const [categories, setCategories] = useState([]);
  const [pref, setPref] = useState([]);
  const getFilteredData = async () => {
    const filterData = await authFetch.get(`/brand/filter/all`);
    setPref(filterData.data.pref);
    setCategories(filterData.data.categories);
  };
  useEffect(() => {
    getFilteredData();
  }, []);
  return { categories, pref };
}

export default useBrandData;
