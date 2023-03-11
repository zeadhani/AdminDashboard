import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const isLoggedIn = useSelector((state) => state.Auth.loggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/Auth/Login" />;
};

export default PrivateRoutes;