import { database } from "../../services/database";

export const getListsUpc = products => {
  //Lists UPC
  return async dispatch => {
    dispatch({ type: "FETCH_PRODUCTS_REQUEST", payload: true });
    if (products) {
      dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: { products } });
    } else {
      dispatch({ type: "FETCH_PRODUCTS_FAIL", payload: false });
    }
  };
};

export const getUpcById = async (dispatch, upcId) => {
  //get UPC by ID firebase
  dispatch({ type: "FETCH_UPCBYID_REQUEST", payload: true });
  const result = await database.getUpcByID(upcId);
  if (result) {
    dispatch({ type: "FETCH_UPCBYID_SUCCESS", payload: { result } });
  } else {
    dispatch({ type: "FETCH_UPCBYID_FAIL", payload: false });
  }
};

export const getListsImei = async (dispatch, upcId) => {
  dispatch({ type: "FETCH_IMEI_REQUEST", payload: true });
  const imeis = await database.getProducts(upcId);
  if (imeis) {
    dispatch({ type: "FETCH_IMEI_SUCCESS", payload: { imeis } });
  } else {
    dispatch({ type: "FETCH_IMEI_FAIL", payload: false });
  }
};
