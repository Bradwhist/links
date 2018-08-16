import { FETCH_PROFILE } from "../actions/types";

export default function(state = { subscriptions: [], posts: [], comments: [] }, action) {
  switch(action.type) {
    case FETCH_PROFILE:
      return action.payload;
    default:
      return state;
  }
}
