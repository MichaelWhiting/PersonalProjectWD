import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "./sessionReducer.js";

export default configureStore({ // creates a store for the reducer
    reducer: sessionReducer
})