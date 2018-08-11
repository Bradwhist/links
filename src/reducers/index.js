import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import HoverReducer from './HoverReducer'
import authReducer from './authReducer'
import subsReducer from './subsReducer'
import subReducer from './subReducer'
import postsReducer from './postsReducer'
import postReducer from './postReducer'
import commentsReducer from './commentsReducer'

export default createStore(
  combineReducers({
    hover: HoverReducer,
    auth: authReducer,
    subs: subsReducer,
    sub: subReducer,
    posts: postsReducer,
    post: postReducer,
    comments: commentsReducer,
  }),
  applyMiddleware(
    ReduxThunk
  )
)
