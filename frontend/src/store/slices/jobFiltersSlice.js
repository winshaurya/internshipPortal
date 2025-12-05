import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  location: "",
  type: "",
  sort: "recent",
};

const jobFiltersSlice = createSlice({
  name: "jobFilters",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setSearch, setLocation, setType, setSort, resetFilters } = jobFiltersSlice.actions;
export default jobFiltersSlice.reducer;
