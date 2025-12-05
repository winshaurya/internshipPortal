import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const initialState = {
  token: tokenFromStorage,
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  role: userFromStorage ? JSON.parse(userFromStorage)?.role ?? null : null,
  status: tokenFromStorage ? "authenticated" : "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.role = action.payload.role ?? action.payload.user?.role ?? null;
      state.status = "authenticated";
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.status = "idle";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("api_token"); // clean up legacy key
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
