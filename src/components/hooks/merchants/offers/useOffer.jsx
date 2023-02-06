import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

function useOffer(id, setServerErrors, setLoading) {
  const [offer, setOffer] = useState();
  const getOffer = async () => {
    setLoading(true);
    try {
      const offerData = await axios.get(
        `${process.env.REACT_APP_API_URL}/offer/${id}`
      );

      setOffer(offerData.data);
    } catch (err) {
      setServerErrors(err.response.data.error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (id) {
      getOffer();
    }
  }, [id]);
  return { offer };
}

export default useOffer;
