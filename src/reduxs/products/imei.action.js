import { database } from "../../services/database";

export const getAllImeis = async dispatch => {
  dispatch({ type: "FETCH_ALL_IMEI_REQUEST", payload: true });

  const imeis = await database.getImeis();

  if (imeis) {
    dispatch({ type: "FETCH_ALL_IMEI_SUCCESS", payload: { imeis } });
  } else {
    dispatch({ type: "FETCH_ALL_IMEI_FAIL", payload: false });
  }
};
