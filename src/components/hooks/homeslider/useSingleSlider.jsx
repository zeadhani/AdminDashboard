import { useEffect, useState } from "react";
import authFetch from "../../../services/interceptors";

function useSingleSlider({ id }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [serverErrors,setServerErrors]=useState()
  const getData = async () => {
    try {
      const image = await authFetch.get(
        `${process.env.REACT_APP_API_URL}/homeSlider/${id}`
      );
      setData(image.data);
      setLoading(false);
    } catch (err) {
       setServerErrors(err.response.data.error)
    }
  };
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);
  return { data ,loading,serverErrors,setServerErrors};
}

export default useSingleSlider;
