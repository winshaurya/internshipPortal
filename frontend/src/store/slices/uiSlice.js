import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalLoading: false,
  toasts: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    pushToast: (state, action) => {
      state.toasts.push(action.payload);
    },
    shiftToast: (state) => {
      state.toasts.shift();
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { setGlobalLoading, pushToast, shiftToast, clearToasts } = uiSlice.actions;
export default uiSlice.reducer;
