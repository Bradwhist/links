import { FETCH_USER, LOGIN, LOGOUT } from "../actions/types";

export default function(state = null, action) {
  console.log(action);
  switch(action.type) {
    case FETCH_USER:
    console.log('fetchuser');
      // action.payload will return empty string if it gets nothing
      // so we return || false to make sure we get false

      //  action.payload will return the user if a user is logged in
      return action.payload || false;
    case LOGIN:
    console.log('login');
      return action.payload || false;
    case LOGOUT:
    console.log('logging out');
      return false;
    default:
      return state;
  }
}
