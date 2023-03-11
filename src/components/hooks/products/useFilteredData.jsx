import { useEffect, useState } from "react";
import authFetch from "../../../services/interceptors";
import { useQuery } from "react-query";

function useFilteredData() {
  // const [categories, setCategories] = useState([]);
  // const [gender, setGender] = useState([]);
  // const [brands, setBrands] = useState([]);
  // const [allattributes, setallattributes] = useState([]);
  // useEffect(() => {
  //   const getFilteredData = async () => {
  //     const filterData = await authFetch.get(`/products/filter/all`);
  //     setCategories(filterData.data.categories);
  //     setGender(filterData.data.gender);
  //     setBrands(filterData.data.brands);
  //     setallattributes(filterData.data.attributes);
  //   };
  //   getFilteredData();
  // }, []);
  // return { categories, gender, brands, allattributes };
  return useQuery("productsFilteredData", async () => {
    const { data } = await authFetch.get("/products/filter/all");
    return {
      categories: data.categories,
      gender: data.gender,
      brands: data.brands,
      allattributes: data.attributes,
    };
  });
}

export default useFilteredData;
