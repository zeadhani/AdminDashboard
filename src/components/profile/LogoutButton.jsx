import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authStore";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.Logout());
    navigate("/Auth/Login");
  };
  return (
    <Button
      sx={{
        display: "block",
        marginLeft: "auto",
        marginTop: "50px",
        mb: "20px",
      }}
      variant="contained"
      color="error"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
