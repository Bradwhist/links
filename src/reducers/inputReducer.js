import { GET_INPUT, FETCH_SEARCH } from "../actions/types";

export default function(state = { posts: [], subscriptions: [], inputVal: ''}, action) {
  // console.log('authreducer: action', action, 'state', state);
  switch(action.type) {
    case FETCH_SEARCH:
      let newState = JSON.parse(JSON.stringify(state));
      newState.posts = action.payload.posts;
      newState.subscriptions = action.payload.subscriptions;
      return newState
    case GET_INPUT:
      let newState2 = JSON.parse(JSON.stringify(state));
      if (action.value === '') {

        return {inputVal: state.inputVal};
      }
      else {
        return { inputVal: action.value};
      }
    default:
      return state;
  }
}
