import { useEffect, useState } from "react";
import authFetch from "../../../services/interceptors";

function usePreferences() {
  const [pref, setPref] = useState([]);
  const getFilteredData = async () => {
    const filterData = await authFetch.get(`/pref`);
    setPref(filterData.data);
  };
  useEffect(() => {
    getFilteredData();
  }, []);
  return { pref };
}

export default usePreferences;
