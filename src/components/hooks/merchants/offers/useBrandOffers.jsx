import { useEffect } from "react";
import { useState } from "react";
import authFetch from "../../../../services/interceptors";

function useBrandOffers(id) {
  const [offers, setOffers] = useState([]);
  const [offersNumber, setOffersNumber] = useState(0);
  const [ordersNumber, setOrdersNumber] = useState(0);
  const [requestsNumber, setRequestsNumber] = useState(0);
  const [productsNumber, setProductsNumber] = useState(0);

  const setData = (model) => {
    setOffers(model);
    setOffersNumber(model.length);
    setOrdersNumber(model.reduce((n, { _count }) => n + _count.Order, 0));
    setRequestsNumber(model.reduce((n, { _count }) => n + _count.requests, 0));
    setProductsNumber(model.reduce((n, { _count }) => n + _count.products, 0));
  };

  const getBrandOffers = async () => {
    try {
      const offersData = await authFetch.get(`/offer/brand/${id}`);
      setData(offersData.data);
    } catch (err) {
      // console.log(err.response.data.error)
    }
  };
  useEffect(() => {
    getBrandOffers();
  }, []);

  const setNewOffers = (newOffers) => {
    setData(newOffers);
  };

  return {
    offers,
    offersNumber,
    ordersNumber,
    requestsNumber,
    productsNumber,
    setNewOffers,
  };
}

export default useBrandOffers;
