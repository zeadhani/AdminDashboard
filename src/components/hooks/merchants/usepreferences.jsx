import axios from "axios";
import  { useEffect, useState } from "react";

function usePreferences() {
  const [pref, setPref] = useState([]);
  const getFilteredData = async () => {
    const filterData = await axios.get(`${process.env.REACT_APP_API_URL}/pref`);
    setPref(filterData.data);
  };
  useEffect(() => {
    getFilteredData();
  }, []);
  return {pref};
}

export default usePreferences;
