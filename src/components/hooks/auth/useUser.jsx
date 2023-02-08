
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import authFetch from "../../../services/interceptors";

function useUser() {
  const data = useSelector((state) => state.Auth.user);
  const email = data.replace(/"/g, "");
  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      const userData = await authFetch.get(`/user/${email}`);
      if (userData.data) {
        setUser(userData.data);
      }
    } catch (err) {}
  };
  useEffect(() => {
    if (email) {
      getUser();
    }
  }, [email]);
  return { user };
}

export default useUser;
