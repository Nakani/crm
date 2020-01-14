const INITIAL_STATE = {
  loaded: false,
  sells: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_SELLS_REQUEST": {
      return { ...state, loaded: action.payload };
    }
    case "FETCH_SELLS_SUCCESS": {
      return { ...state, sells: action.payload.sells, loaded: "false" };
    }
    case "FETCH_SELLS_FAIL": {
      return { ...state, sells: INITIAL_STATE.sells, loaded: "false" };
    }
    default: {
      return state;
    }
  }
};
