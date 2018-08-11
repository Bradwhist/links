import { FETCH_POST, UPVOTE_POST_2, DOWNVOTE_POST_2 } from "../actions/types";

export default function(state = {}, action) {
  console.log(action);
  switch(action.type) {
    case FETCH_POST:
      let newState = action.payload.post;
        if (newState.upvotes.indexOf(action.payload.user) === -1) {
          newState.upVoted = false;
        } else {
          newState.upVoted = true;
        }
        if (newState.downvotes.indexOf(action.payload.user) === -1) {
          newState.downVoted = false;
        } else {
          newState.downVoted = true;
        }
        return newState;

      case UPVOTE_POST_2:
        let newState2 = JSON.parse(JSON.stringify(state));
        newState2.upVoted = !newState2.upVoted;
        newState2.downVoted = false;
      return newState2;
      case DOWNVOTE_POST_2:
        let newState3 = JSON.parse(JSON.stringify(state));
        newState3.downVoted = !newState3.downVoted;
        newState3.upVoted = false;
      return state;
      default:
      return state;
  }
}
