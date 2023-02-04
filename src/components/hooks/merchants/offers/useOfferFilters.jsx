import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function useOfferFilters(setServerErrors) {
  const [offerRange, setOfferRange] = useState([]);
  const [offerType, setOfferType] = useState(0);
  const getOffersFilteredData = async () => {
    try {
      const filteredData = await axios.get(
        `${process.env.REACT_APP_API_URL}/offer/filter/all`
      );

      setOfferRange(filteredData.data.offerRange);
      setOfferType(offerType.data.offerType);
    } catch (error) {}
  };
  useEffect(() => {
    getOffersFilteredData();
  }, []);
  return { offerRange, offerType };
}

export default useOfferFilters;
