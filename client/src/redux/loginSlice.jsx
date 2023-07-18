import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  error: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      (state.isLoggedIn = true), (state.error = false);
    },
    loginFailure: (state) => {
      (state.isLoggedIn = false), (state.error = true);
    },  
  },
});

export const { loginFailure, loginSuccess } = loginSlice.actions;
export default loginSlice.reducer;
