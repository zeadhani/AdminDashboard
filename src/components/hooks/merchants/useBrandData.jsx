import axios from "axios"; 
import { useEffect } from "react";
import { useState } from "react";

function useBrandData() {
  const [categories, setCategories] = useState([]);
  const [pref, setPref] = useState([]);
  const getFilteredData = async () => {
    const filterData = await axios.get(
      `${process.env.REACT_APP_API_URL}/brand/filter/all`
    );
    setPref(filterData.data.pref);
    setCategories(filterData.data.categories);
  };
  useEffect(() => {
    getFilteredData();
  }, []);
  return { categories, pref };
}

export default useBrandData;
