import React from "react";
import { useState } from "react";
import authFetch from "../../../services/interceptors";
import { useEffect } from "react";

function useRoles(fetch) {
  const [roles, setRoles] = useState();
  const getRoles = async () => {
    const rolesData = await authFetch.get(`/role`);
    setRoles(rolesData.data);
  };

  useEffect(() => {
    if (fetch) {
      getRoles();
    }
  }, []);
  return { roles };
}
export default useRoles;
