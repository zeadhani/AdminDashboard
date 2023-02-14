import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import authFetch from "../../../services/interceptors";

function useUser(email) {
  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      const userData = await authFetch.get(`/user/${email}`);
      setUser(userData.data);
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
