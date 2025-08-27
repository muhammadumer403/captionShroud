import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
 

    logout: (state) => {
      return { user: null, token: null };
    },
  },
});

export const { login, logout, signup } = authSlice.actions;
export default authSlice.reducer;
