import { useEffect, useState } from "react";
import authFetch from "../../../services/interceptors";

function useCategories() {
  const [categories, setCategories] = useState();
  const getCategories = async () => {
    const categoriesData = await authFetch.get(`/category`);
    setCategories(categoriesData.data);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return { categories };
}

export default useCategories;
