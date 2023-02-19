import { useState } from "react";
import authFetch from "../../../services/interceptors";
import { useEffect } from "react";

function useMessage() {
  const [count, setCount] = useState(0);
  const getCount = async () => {
    try {
      const data = await authFetch.get("/contactus/count");
      setCount(data.data.count);
    } catch (error) {}
  };
  useEffect(() => {
    getCount();
  }, []);
  return { count };
}

export default useMessage;
