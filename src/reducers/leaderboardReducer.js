import axios from "axios";

let initialState = {
    loading: false,
    scores: []
}

// const requestScores = async (dispatch) => {
//     dispatch({
//         type: "PENDING"
//     })

//     console.log(gameName)

//     const scores = await axios.get(`/leaderboard/${gameName}`)
//     // .then(res => res.data.scores);

//     dispatch({
//         type: "REQUEST_SCORES",
//         payload: scores.data
//     })
// }

const leaderboardReducer = async (state = initialState, action) => {
    switch(action.type) {
        case "PENDING":
            return {
                ...state,
                loading: true
            }
        case "REQUEST_SCORES":
            return {
                loading: false,
                scores: action.payload
            }
        default:
            return state;
    }
}

export { leaderboardReducer } ;