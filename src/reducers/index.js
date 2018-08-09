import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import HoverReducer from './HoverReducer'
import authReducer from './authReducer'
import subsReducer from './subsReducer'

export default createStore(
  combineReducers({
    hover: HoverReducer,
    auth: authReducer,
    subs: subsReducer,
  }),
  applyMiddleware(
    ReduxThunk
  )
)
