import { useEffect, useState } from "react";
import authFetch from "../../../services/interceptors";

function useFilteredData() {
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState([]);
  const [brands, setBrands] = useState([]);
  const [allattributes, setallattributes] = useState([]);
  useEffect(() => {
    const getFilteredData = async () => {
      const filterData = await authFetch.get(`/products/filter/all`);
      setCategories(filterData.data.categories);
      setGender(filterData.data.gender);
      setBrands(filterData.data.brands);
      setallattributes(filterData.data.attributes);
    };
    getFilteredData();
  }, []);
  return { categories, gender, brands, allattributes };
}

export default useFilteredData;
