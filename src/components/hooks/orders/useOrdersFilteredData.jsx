import { useState } from "react";
import authFetch from "../../../services/interceptors";
import { useEffect } from "react";

function useOrdersFilteredData() {
  const [ordersFilteredData, setOrdersFilteredData] = useState();
  const getFilteredData = async () => {
    const filterData = await authFetch.get("/orders/filtered/data");
    setOrdersFilteredData(filterData.data);
  };
  useEffect(() => {
    getFilteredData();
  }, []);
  return {ordersFilteredData};
}

export default useOrdersFilteredData;
