import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authStore";
import messageCountSlice from "./messageCountSlice";
const store = configureStore({
  reducer: { Auth: AuthSlice.reducer, Count: messageCountSlice.reducer },
});
export default store;
