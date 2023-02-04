import axios from "axios";
import { useEffect, useState } from "react";

function useFilteredData() {
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState([]);
  const [brands, setBrands] = useState([]);
  const [allattributes, setallattributes] = useState([]);
  useEffect(() => {
    const getFilteredData = async () => {
      const filterData = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/filter/all`
      );
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
