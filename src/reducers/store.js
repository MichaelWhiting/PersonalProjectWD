import { configureStore } from "@reduxjs/toolkit";

// Import reducers for each component here
// import { leaderboardsReducer } from "./leaderboardsReducer.js";
// import { leaderboardReducer } from "./leaderboardReducer.js";
import { sessionReducer } from "./sessionReducer.js";

export default configureStore({
    reducer: sessionReducer
})