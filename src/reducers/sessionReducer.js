
const initialState = { // creates the initial state which should be null
    userId: null
}

export const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case "USER_AUTH": // this is when the user is being logged in, it will set the redux store variable to
            return {      // what the server has stored
                userId: action.payload
            }
        case "LOGOUT": // this updates it to be null, for when the user is being logged out
            return {
                userId: null
            }
        default:
            return state
    }
}