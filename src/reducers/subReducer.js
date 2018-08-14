import { FETCH_SUB, UPVOTE_POST_FROM_SUB, DOWNVOTE_POST_FROM_SUB } from "../actions/types";

export default function(state = { sub: {}, posts: [] }, action) {
  console.log(action);
  console.log(state);
  switch(action.type) {
    case FETCH_SUB:

      return action.payload;
      case UPVOTE_POST_FROM_SUB:
        let newState = JSON.parse(JSON.stringify(state));
        console.log(action.payload.score);
        newState.posts[action.payload.index].upVoted = !newState.posts[action.payload.index].upVoted;
        newState.posts[action.payload.index].downVoted = false;
        newState.posts[action.payload.index].score = action.payload.score;
      return newState;
      case DOWNVOTE_POST_FROM_SUB:
        let newState2 = JSON.parse(JSON.stringify(state));
        console.log(action.payload.score);
        newState2.posts[action.payload.index].downVoted = !newState2.posts[action.payload.index].downVoted;
        newState2.posts[action.payload.index].upVoted = false;
        newState2.posts[action.payload.index].score = action.payload.score;
      return newState2;

    default:
      return state;
  }
}
