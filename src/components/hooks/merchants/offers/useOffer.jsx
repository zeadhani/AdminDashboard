import { useEffect } from "react";
import { useState } from "react";
import authFetch from "../../../../services/interceptors";

function useOffer(id, setServerErrors, setLoading) {
  const [offer, setOffer] = useState();
  const getOffer = async () => {
    setLoading(true);
    try {
      const offerData = await authFetch.get(`/offer/${id}`);
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
