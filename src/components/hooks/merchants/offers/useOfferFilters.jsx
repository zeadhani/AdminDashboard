import { useEffect } from "react";
import { useState } from "react";
import authFetch from "../../../../services/interceptors";

function useOfferFilters(setServerErrors) {
  const [offerRange, setOfferRange] = useState([]);
  const [offerType, setOfferType] = useState(0);
  const getOffersFilteredData = async () => {
    try {
      const filteredData = await authFetch.get(`/offer/filter/all`);
      setOfferRange(
        filteredData.data.offerRange.map((item) => {
          return item.lowestPrice + " - " + item.highestPrice + " EGP";
        })
      );
      setOfferType(
        filteredData.data.offerType?.map((item) => {
          return item.name;
        })
      );
    } catch (error) {}
  };
  useEffect(() => {
    getOffersFilteredData();
  }, []);
  return { offerRange, offerType };
}

export default useOfferFilters;
