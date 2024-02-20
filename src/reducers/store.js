import { configureStore } from "@reduxjs/toolkit";

// Import reducers for each component here
import { leaderboardsReducer } from "./leaderboardsReducer.js";
import { leaderboardReducer } from "./leaderboardReducer.js";

export default configureStore({
    reducer: {
        leaderboards: leaderboardsReducer,
        leaderboard: leaderboardReducer
    }
})