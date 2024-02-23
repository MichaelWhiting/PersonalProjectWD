
const initialState = {
    userId: null
}

export const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case "USER_AUTH":
            return {
                userId: action.payload
            }
        case "LOGOUT":
            return {
                userId: null
            }
        default:
            return state
    }
}