import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authStore";
const store = configureStore({
  reducer: { Auth: AuthSlice.reducer },
});
export default store;
