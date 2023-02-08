import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: localStorage.getItem("key") || false,
  user: localStorage.getItem("user") || "",
  token: localStorage.getItem("token") || "",
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    Login(state, action) {
      state.loggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("key", JSON.stringify(state.loggedIn));
      localStorage.setItem("token", JSON.stringify(state.token));
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    Logout(state) {
      state.loggedIn = false;
      localStorage.removeItem("key");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
export default AuthSlice;
export const authActions = AuthSlice.actions;
