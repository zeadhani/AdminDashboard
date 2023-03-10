import authFetch from "../../../services/interceptors";
import { useQuery } from "react-query";
function useDashboardData() {
  return useQuery("dashboardData", async () => {
    const { data } = await authFetch.get("/dashboard");
    return data;
  });
}

export default useDashboardData;

// const [data, setData] = useState();
// const getDashboardData = async () => {
//   setLoading(true);
//   try {
//     const dashboarddata = await authFetch.get("/dashboard");
//     setData(dashboarddata.data);
//   } catch (error) {
//     setError(true);
//   }
//   setLoading(false);
// };
// useEffect(() => {
//   getDashboardData();
// }, []);
// return { data };
