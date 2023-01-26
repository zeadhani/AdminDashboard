import { createSlice } from "@reduxjs/toolkit";
const initialState = { loggedIn: localStorage.getItem("key") || false };

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    Login(state) {
      state.loggedIn = true;
      localStorage.setItem("key", JSON.stringify(state.loggedIn));
    },
    Logout(state) {
      state.loggedIn = false;
      localStorage.removeItem("key");
    },
  },
});
export default AuthSlice;
export const authActions = AuthSlice.actions;
