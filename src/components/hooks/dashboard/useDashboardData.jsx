import { useEffect, useState } from "react";
import authFetch from "../../../services/interceptors";
function useDashboardData(setLoading, setError) {
  const [data, setData] = useState();
  const getDashboardData = async () => {
    setLoading(true);
    try {
      const dashboarddata = await authFetch.get("/dashboard");
      setData(dashboarddata.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    getDashboardData();
  }, []);
  return { data };
}

export default useDashboardData;
