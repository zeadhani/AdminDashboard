import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authStore";
function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.Logout());
    navigate("/Auth/Login");
  };
  return (
    <Button variant="contained" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Profile;
