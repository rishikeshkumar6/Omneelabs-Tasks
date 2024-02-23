import { configureStore } from "@reduxjs/toolkit";
import  { appReducer } from "./userSlice";

const store = configureStore({
  reducer: appReducer
});

export default store;






