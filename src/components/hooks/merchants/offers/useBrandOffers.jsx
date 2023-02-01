import axios from "axios";

import { useEffect } from "react";
import { useState } from "react";

function useBrandOffers(id) {
  const [offers, setOffers] = useState([]);
  const [offersNumber, setOffersNumber] = useState(0);
  const [ordersNumber, setOrdersNumber] = useState(0);
  const [requestsNumber, setRequestsNumber] = useState(0);
  const [productsNumber, setProductsNumber] = useState(0);
  const getBrandOffers = async () => {
    const offersData = await axios.get(
      `${process.env.REACT_APP_API_URL}/offer/${id}`
    );

    setOffers(offersData.data);
    setOffersNumber(offersData.data.length);
    setOrdersNumber(
      offersData.data.reduce((n, { _count }) => n + _count.Order, 0)
    );
    setRequestsNumber(
      offersData.data.reduce((n, { _count }) => n + _count.requests, 0)
    );
    setProductsNumber(
      offersData.data.reduce((n, { _count }) => n + _count.products, 0)
    );
  };
  useEffect(() => {
    getBrandOffers();
  }, []);
  return { offers, offersNumber, ordersNumber, requestsNumber, productsNumber };
}

export default useBrandOffers;
