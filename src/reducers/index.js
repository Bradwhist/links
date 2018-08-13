import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import authReducer from './authReducer'
import subsReducer from './subsReducer'
import inputReducer from './inputReducer'
import subReducer from './subReducer'
import postsReducer from './postsReducer'
import postReducer from './postReducer'
import commentsReducer from './commentsReducer'

export default createStore(
  combineReducers({
    auth: authReducer,
    subs: subsReducer,
    input: inputReducer,
    sub: subReducer,
    posts: postsReducer,
    post: postReducer,
    comments: commentsReducer
  }),
  applyMiddleware(
    ReduxThunk
  )
)
