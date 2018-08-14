import { FETCH_SUB, UPVOTE_POST_FROM_SUB, DOWNVOTE_POST_FROM_SUB, SUBSCRIBE_FROM_SUB } from "../actions/types";

export default function(state = { sub: {}, posts: [], subscribed: null }, action) {
  switch(action.type) {
    case FETCH_SUB:
      return action.payload;
      case UPVOTE_POST_FROM_SUB:
        let newState = JSON.parse(JSON.stringify(state));
        newState.posts[action.payload.index].upVoted = !newState.posts[action.payload.index].upVoted;
        newState.posts[action.payload.index].downVoted = false;
        newState.posts[action.payload.index].score = action.payload.score;
      return newState;
      case DOWNVOTE_POST_FROM_SUB:
        let newState2 = JSON.parse(JSON.stringify(state));
        newState2.posts[action.payload.index].downVoted = !newState2.posts[action.payload.index].downVoted;
        newState2.posts[action.payload.index].upVoted = false;
        newState2.posts[action.payload.index].score = action.payload.score;
      return newState2;
      case SUBSCRIBE_FROM_SUB:
        let newState3 = JSON.parse(JSON.stringify(state));
        newState3.subscribed = !newState3.subscribed;
      return newState3;
    default:
      return state;
  }
}
