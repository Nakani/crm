import { database } from "../../services/database";

export const getUsersList = async dispatch => {
  dispatch({ type: "FETCH_USERS_REQUEST", payload: true });

  const users = await database.getUsers();

  if (users) {
    dispatch({ type: "FETCH_USERS_SUCCESS", payload: { users } });
  } else {
    dispatch({ type: "FETCH_USERS_FAIL", payload: false });
  }
};
