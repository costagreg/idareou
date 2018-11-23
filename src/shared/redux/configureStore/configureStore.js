import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducers from '../rootReducers'
import { fetchAPI } from '../helpers/fetchAPI'

const configureStore = (initialState, req) => {
  const composeEnhancers = process.browser ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose
  const cookie = (req && req.get('cookie')) || ''

  return createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware.withExtraArgument(fetchAPI(cookie)))) // Passing fetchAPI to use it in every thunk action creators
  )
}

export default configureStore
