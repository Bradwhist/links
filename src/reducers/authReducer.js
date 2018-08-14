import { FETCH_USER, LOGIN, LOGOUT } from "../actions/types";

export default function(state = { loaded: false, logged: false }, action) {
  switch(action.type) {
    case FETCH_USER:
      // action.payload will return empty string if it gets nothing
      // so we return || false to make sure we get false

      //  action.payload will return the user if a user is logged in
      return { loaded: true, logged: action.payload || false };
    case LOGIN:
      return { loaded: true, logged: action.payload || false };
    case LOGOUT:
      return { loaded: false, logged: false };
    default:
      return state;
  }
}
