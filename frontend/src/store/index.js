import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import jobFiltersReducer from "./slices/jobFiltersSlice";
import { api } from "./services/api";

// Central store configuration with RTK Query middleware
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    jobFilters: jobFiltersReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

// Typed-ish hooks for convenience (JS version)
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
