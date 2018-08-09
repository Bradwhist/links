import { FETCH_USER, LOGIN, LOGOUT } from "../actions/types";

export default function(state = { loaded: false, auth: false }, action) {
  console.log('authreducer: action', action, 'state', state);
  switch(action.type) {
    case FETCH_USER:
    console.log('fetchuser');
      // action.payload will return empty string if it gets nothing
      // so we return || false to make sure we get false

      //  action.payload will return the user if a user is logged in
      return { loaded: true, auth: action.payload || false };
    case LOGIN:
    console.log('login');
      return { loaded: true, auth: action.payload || false };
    case LOGOUT:
    console.log('logging out');
      return { loaded: false, auth: false };
    default:
      return state;
  }
}
