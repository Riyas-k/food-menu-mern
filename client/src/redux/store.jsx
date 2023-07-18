import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
