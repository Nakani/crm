const INITIAL_STATE = {
    loaded: false,
    products: {},
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS_REQUEST': {
            return { ...state, loaded: action.payload }
        }
        case 'FETCH_PRODUCTS_SUCCESS': {
            return { ...state, products: action.payload.products, loaded: 'false' }
        }
        case 'FETCH_PRODUCTS_FAIL': {
            return { ...state, products: INITIAL_STATE.products, loaded: 'false' }
        }
        default: {
            return state
        }
    }
}
