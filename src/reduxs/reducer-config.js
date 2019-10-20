import { combineReducers } from 'redux'
import productsReducer from './products/product.reducer'
import imeisReducer from './products/imei.reducer'

const rootReducer = combineReducers({
  productsReducer,
  imeisReducer
})

export default rootReducer
