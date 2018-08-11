import { FETCH_SUB } from "../actions/types";

export default function(state = { sub: {}, posts: [] }, action) {
  console.log(action);
  switch(action.type) {
    case FETCH_SUB:
    console.log('in fetch_sub');
      return action.payload;
    default:
      return state;
  }
}
