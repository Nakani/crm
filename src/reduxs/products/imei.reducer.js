const INITIAL_STATE = {
    loaded: false,
    imeis: [],
    upc: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_IMEI_REQUEST': {
            return { ...state, loaded: action.payload }
        }
        case 'FETCH_IMEI_SUCCESS': {
            return { ...state, imeis: action.payload.imeis, loaded: 'false' }
        }
        case 'FETCH_IMEI_FAIL': {
            return { ...state, imeis: action.payload.lists, loaded: 'false' }
        }

        case 'FETCH_UPCBYID_REQUEST': {
            return { ...state, loaded: action.payload }
        }
        case 'FETCH_UPCBYID_SUCCESS': {
            return { ...state, upc: action.payload.result, loaded: 'false' }
        }
        case 'FETCH_UPCBYID_FAIL': {
            return { ...state, upcbyId: action.payload.lists, loaded: 'false' }
        }
        default: {
            return state
        }
    }
}
