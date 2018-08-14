import { FETCH_POST, UPVOTE_POST_2, DOWNVOTE_POST_2, UPVOTE_COMMENT, DOWNVOTE_COMMENT, CREATE_ROOT_COMMENT, CREATE_COMMENT } from "../actions/types";

export default function(state = { post: {}, comments: [] }, action) {
  //console.log(action);
  switch(action.type) {
    case FETCH_POST:
      let newState = {};
      newState.comments = action.payload.comments;
      newState.post = action.payload.post;
        if (newState.post.upvotes.indexOf(action.payload.user) === -1) {
          newState.post.upVoted = false;
        } else {
          newState.post.upVoted = true;
        }
        if (newState.post.downvotes.indexOf(action.payload.user) === -1) {
          newState.post.downVoted = false;
        } else {
          newState.post.downVoted = true;
        }
        newState.comments.sort((a, b) => a.score < b.score);
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
      return newState3;
      case UPVOTE_COMMENT:
        let newState4 = JSON.parse(JSON.stringify(state));
        newState4.comments[action.payload.index].score = action.payload.score;
      return newState4;
      case DOWNVOTE_COMMENT:
        let newState5 = JSON.parse(JSON.stringify(state));
        newState5.comments[action.payload.index].score = action.payload.score;
      return newState5;
      case CREATE_ROOT_COMMENT:
        let newState6 = JSON.parse(JSON.stringify(state));
        newState6.comments.push(action.payload);
        return newState6;

      case CREATE_COMMENT:
        let newState7 = JSON.parse(JSON.stringify(state));
        let checkIndex = (comment) => {
          return comment._id === action.payload.parent
        }
        let currentIndex = newState7.comments.findIndex(checkIndex);

        newState7.comments[currentIndex].comments.push(action.payload._id);
        newState7.comments.push(action.payload);
        return newState7;

      default:
      return state;
  }
}
