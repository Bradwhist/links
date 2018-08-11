import { FETCH_COMMENTS_FP } from "../actions/types";

export default function(state = [], action) {
  console.log(action);
  switch(action.type) {
    case FETCH_COMMENTS_FP:
    console.log('fetch_comments');
      return action.payload;
    default:
      return state;
  }
}
