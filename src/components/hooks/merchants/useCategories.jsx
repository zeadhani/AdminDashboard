import axios from "axios";
import { useEffect, useState } from "react";

function useCategories() {
  const [categories, setCategories] = useState();
  const getCategories = async () => {
    const categoriesData = await axios.get(
      `${process.env.REACT_APP_API_URL}/category`
    );

    setCategories(categoriesData.data);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return { categories };
}

export default useCategories;
