import { database } from "../../services/database";

export const getSellsList = async dispatch => {
  dispatch({ type: "FETCH_SELLS_REQUEST", payload: true });

  const sells = await database.getSells();

  if (sells) {
    dispatch({
      type: "FETCH_SELLS_SUCCESS",
      payload: { sells }
    });
  } else {
    dispatch({ type: "FETCH_SELLS_FAIL", payload: false });
  }
};
