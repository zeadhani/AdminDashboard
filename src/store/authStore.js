import { createSlice } from "@reduxjs/toolkit";
const initialState = { loggedIn: true };
const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    Login(state) {
      state.loggedIn = true;
    },
    Logout(state) {
      state.loggedIn = false;
    },
  },
});
export default AuthSlice;
export const authActions = AuthSlice.actions;
