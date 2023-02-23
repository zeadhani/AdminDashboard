import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const messageCountSlice = createSlice({
  name: "messagecount",
  initialState,
  reducers: {
    setcount(state, action) {
      state.count = action.payload.count;
    },
    decreaseCount(state) {
      state.count = state.count - 1;
    },
  },
});
export default messageCountSlice;
export const messageCountActions = messageCountSlice.actions;
