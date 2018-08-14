import { FETCH_COMMENTS_FP } from "../actions/types";

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_COMMENTS_FP:
      return action.payload;
    default:
      return state;
  }
}
