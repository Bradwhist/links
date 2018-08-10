import { GET_INPUT } from "../actions/types";

export default function(state = { inputVal: ''}, action) {
  // console.log('authreducer: action', action, 'state', state);
  switch(action.type) {
    case GET_INPUT:
      if (action.value === '') {
        return null;
      }
      else {
        return { inputVal: action.value};
      }
    default:
      return state;
  }
}
