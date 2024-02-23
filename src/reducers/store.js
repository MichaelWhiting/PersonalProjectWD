import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "./sessionReducer.js";

export default configureStore({
    reducer: sessionReducer
})