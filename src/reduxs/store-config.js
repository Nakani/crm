import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducers from './reducer-config'

export default createStore(reducers, {}, applyMiddleware(thunk))

