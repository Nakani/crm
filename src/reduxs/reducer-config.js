import { combineReducers } from "redux";
import productsReducer from "./products/product.reducer";
import imeisReducer from "./products/imei.reducer";
import authReducer from "./auth/auth.reducer";
import usersReducer from "./users/user.reducer";
import sellsReducer from "./sells/sell.reducer";

const rootReducer = combineReducers({
  productsReducer,
  imeisReducer,
  authReducer,
  usersReducer,
  sellsReducer
});

export default rootReducer;
