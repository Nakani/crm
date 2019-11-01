const INITIAL_STATE = {
    loaded: false,
    user: {},
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_USER_REQUEST': {
            return { ...state, loaded: action.payload }
        }
        case 'FETCH_USER_SUCCESS': {
            return { ...state, user: action.payload.result.user, loaded: 'false' }
        }
        case 'FETCH_USER_FAIL': {
            return { ...state, user: INITIAL_STATE.user, loaded: 'false' }
        }
        default: {
            return state
        }
    }
}
