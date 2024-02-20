import axios from "axios";

let initialState = {
    loading: false,
    games: []
}

const requestGames = async (dispatch) => {
    dispatch({
        type: "PENDING"
    });

    let games = await axios.get('/leaderboards/games').then(res => res.data.games);
    
    dispatch({
        type: "REQUEST_GAMES",
        payload: games
    })
}

const leaderboardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "PENDING":
            return {
                ...state,
                loading: true
            }
        case "REQUEST_GAMES":
            console.log(action.payload, "+")
            return {
                loading: false,
                games: action.payload
            }
        default:
            return state;
    }
}

export { requestGames, leaderboardsReducer };