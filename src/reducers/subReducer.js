import { FETCH_SUB, UPVOTE_POST_FROM_SUB, DOWNVOTE_POST_FROM_SUB, SUBSCRIBE_FROM_SUB, TOGGLE_FLAIR } from "../actions/types";

export default function(state = { sub: {}, posts: [], subscribed: null }, action) {
  switch(action.type) {
    case FETCH_SUB:
    let newState4 = action.payload;
    console.log(action.payload.userId);
    for (var i = 0; i < newState4.posts.length; i ++ ) {
      newState4.posts[i].index = i;
      newState4.posts[i].upCount = newState4.posts[i].upvotes.length;
      newState4.posts[i].downCount = newState4.posts[i].downvotes.length;
      if (newState4.posts[i].upvotes.indexOf(action.payload.userId) === -1) {
        newState4.posts[i].upVoted = false;
      } else {
        newState4.posts[i].upVoted = true;
      }
      if (newState4.posts[i].downvotes.indexOf(action.payload.userId) === -1) {
        newState4.posts[i].downVoted = false;
      } else {
        newState4.posts[i].downVoted = true;
      }
    }
      return newState4;
      case UPVOTE_POST_FROM_SUB:
        let cIndex = action.payload.index;
        let newState = JSON.parse(JSON.stringify(state));
        if (newState.posts[cIndex].downVoted) {
          newState.posts[cIndex].upCount ++;
          newState.posts[cIndex].downCount --;
        } else if (newState.posts[cIndex].upVoted) {
          newState.posts[cIndex].upCount --;
        } else {
          newState.posts[cIndex].upCount ++;
        }
        newState.posts[cIndex].upVoted = !newState.posts[cIndex].upVoted;
        newState.posts[cIndex].downVoted = false;
        newState.posts[cIndex].score = action.payload.score;
      return newState;
      case DOWNVOTE_POST_FROM_SUB:
      let cIndex2 = action.payload.index;
        let newState2 = JSON.parse(JSON.stringify(state));
        if (newState2.posts[cIndex2].upVoted) {
          newState2.posts[cIndex2].upCount --;
          newState2.posts[cIndex2].downCount ++;
        } else if (newState2.posts[cIndex2].downVoted) {
          newState2.posts[cIndex2].downCount --;
        } else {
          newState2.posts[cIndex2].downCount ++;
        }
        newState2.posts[cIndex2].downVoted = !newState2.posts[cIndex2].downVoted;
        newState2.posts[cIndex2].upVoted = false;
        newState2.posts[cIndex2].score = action.payload.score;
      return newState2;
      case SUBSCRIBE_FROM_SUB:
        let newState3 = JSON.parse(JSON.stringify(state));
        newState3.subscribed = !newState3.subscribed;
      return newState3;
      case TOGGLE_FLAIR:
        let newState5 = JSON.parse(JSON.stringify(state));
        newState5.sub.flairs = action.payload;
        return newState5;
    default:
      return state;
  }
}
