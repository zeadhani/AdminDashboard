import { useEffect, useState } from "react";
import authFetch from "../../../services/interceptors";

function useSingleProduct(setServerErrors, id, setLoading) {
  const [product, setProduct] = useState();
  const [items, setItems] = useState([]);
  const getProduct = async () => {
    setLoading(true);
    try {
      const product = await authFetch.get(`/products/${id}`);
      setProduct(product.data);
      setItems(product.data.productItems);
    } catch (err) {
      setServerErrors(err.response.data.error);
    }
    setLoading(false);
  };
  const newItems = (items) => {
    setItems(items);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return { product, items, getProduct, newItems };
}

export default useSingleProduct;
