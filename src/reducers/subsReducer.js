import { FETCH_SUBS, SUBSCRIBE } from "../actions/types";

export default function(state = [], action) {
  //console.log(action);
  switch(action.type) {
    case FETCH_SUBS:
     let newState = action.payload.subs;
     console.log(newState);
     for (var i = 0; i < newState.length; i ++) {
       console.log('looping');
       if (action.payload.userSub.indexOf(newState[i]._id) === -1) {
         newState[i].subscribed = false;
       } else {
         newState[i].subscribed = true;
       }
     }
     console.log(newState);
      return newState;
    case SUBSCRIBE:
      let newState2 = state.slice();
      newState2[action.payload].subscribed = !newState2[action.payload].subscribed;
      return newState2;
    default:
      return state;
  }
}
