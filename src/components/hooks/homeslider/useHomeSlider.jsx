import { useState } from "react";
import authFetch from "../../../services/interceptors";
import { useEffect } from "react";

function useHomeSlider() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const getData = async () => {
    try {
      const images = await authFetch.get(
        `${process.env.REACT_APP_API_URL}/homeSlider`
      );
      setData(images.data);
    } catch (err) {
      setError(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return { data, count: 3 ,error};
}

export default useHomeSlider;
