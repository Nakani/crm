import { combineReducers } from 'redux'
import productsReducer from './products/product.reducer'
import imeisReducer from './products/imei.reducer'
import authReducer from './auth/auth.reducer'

const rootReducer = combineReducers({
  productsReducer,
  imeisReducer,
  authReducer

})

export default rootReducer
