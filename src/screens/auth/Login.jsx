import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    dispatch(authActions.Login());
    navigate("/");
  };
  return (
    <Button variant="filled" color="error" onClick={handleLogin}>
      Login
    </Button>
  );
}

export default Login;
