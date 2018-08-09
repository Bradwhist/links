import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import authReducer from './authReducer'
import subsReducer from './subsReducer'

export default createStore(
  combineReducers({
    auth: authReducer,
    subs: subsReducer,
  }),
  applyMiddleware(
    ReduxThunk
  )
)
