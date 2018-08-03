import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import HoverReducer from './HoverReducer'


export default createStore(
  combineReducers({
    hover: HoverReducer
  }),
  applyMiddleware(
    ReduxThunk
  )
)
