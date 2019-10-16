import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import reducers from './reducer-config'

export default createStore(reducers, {}, applyMiddleware(thunkMiddleware))

