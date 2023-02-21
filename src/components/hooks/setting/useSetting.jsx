import { useEffect, useState } from "react";
import authFetch from "../../../services/interceptors";

function useSetting() {
  const [setting, setSetting] = useState();
  const getSetting = async () => {
    try {
      const settingData = await authFetch.get("/setting");
      setSetting(settingData.data);
    } catch (error) {}
  };
  useEffect(() => {
    getSetting();
  }, []);
  return { setting };
}

export default useSetting;
