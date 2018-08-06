import { FETCH_USER, LOGIN } from "../actions/types";

export default function(state = null, action) {
  console.log(action);
  switch(action.type) {
    case FETCH_USER:
      // action.payload will return empty string if it gets nothing
      // so we return || false to make sure we get false

      //  action.payload will return the user if a user is logged in
      return action.payload || false;
    case LOGIN:
      return action.payload || false;
    default:
      return state;
  }
}
