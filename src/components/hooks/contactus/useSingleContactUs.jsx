import { useState } from "react";
import authFetch from "../../../services/interceptors";
import { useEffect } from "react";

function useSingleContactUs(id,setLoading) {
  const [message, setMessage] = useState();
  const getSingleMessage = async () => {
    setLoading(true)
    try {
      const data = await authFetch.get(`contactus/single/${id}`);
      setMessage(data.data);
    } catch (error) {}
    setLoading(false)
  };
  useEffect(() => {
    if (id) {
      getSingleMessage();
    }
  }, []);
  return { message };
}

export default useSingleContactUs;
