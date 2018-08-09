import { FETCH_SUBS } from "../actions/types";

export default function(state = null, action) {
  console.log(action);
  switch(action.type) {
    case FETCH_SUBS:
    console.log('fetch_subs');
      return action.payload;
    default:
      return state;
  }
}
