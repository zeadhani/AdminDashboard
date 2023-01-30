import { useState, useEffect } from "react";
import axios from "axios";
function useSingleBrand(setServerErrors, id, setLoading) {
  const [brand, setBrand] = useState();
  const [brandPreferences, setBrandPreferences] = useState();
  const [brandCtegories, setBrandCategories] = useState();
  const getBrand = async () => {
    setLoading(true);
    try {
      const brand = await axios.get(
        `${process.env.REACT_APP_API_URL}/brand/${id}`
      );

      setBrand(brand.data);
      const categories = [...brand.data.category];
      const newCategories = categories.map((item) => item.Category.name);
      setBrandCategories(newCategories);
      setBrandPreferences(brand.data.Preferences.name);
    } catch (err) {
      setServerErrors(err.response.data.error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getBrand();
  }, []);
  return { brand, brandPreferences, brandCtegories };
}

export default useSingleBrand;
