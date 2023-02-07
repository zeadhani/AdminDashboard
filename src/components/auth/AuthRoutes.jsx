import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import React from "react";

function AuthRoutes() {
  const isLoggedIn = useSelector((state) => state.Auth.loggedIn);
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default AuthRoutes;
