import { useState } from "react";
import authFetch from "../../../services/interceptors";
import { useEffect } from "react";

function useOrderDetails(id) {
  const [order, setOrder] = useState();
  const getOrder = async () => {
    const orderData = await authFetch.get(`/orders/${id}`);
    setOrder(orderData.data);
  };
  useEffect(() => {
    getOrder();
  }, []);
  return { order };
}

export default useOrderDetails;
