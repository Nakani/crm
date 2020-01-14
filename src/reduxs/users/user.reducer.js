const INITIAL_STATE = {
  loaded: false,
  users: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST": {
      return { ...state, loaded: action.payload };
    }
    case "FETCH_USERS_SUCCESS": {
      return { ...state, users: action.payload.users, loaded: "false" };
    }
    case "FETCH_USERS_FAIL": {
      return { ...state, users: INITIAL_STATE.users, loaded: "false" };
    }
    default: {
      return state;
    }
  }
};
