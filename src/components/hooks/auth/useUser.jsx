import axios from "axios";

import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function useUser() {
  const data = useSelector((state) => state.Auth.user);
  const email = data.replace(/"/g, "");
  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      const userData = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${email}`
      );
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
