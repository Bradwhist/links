import { FETCH_POST, FETCH_POST_NONE, UPVOTE_POST_2, DOWNVOTE_POST_2, UPVOTE_COMMENT, DOWNVOTE_COMMENT,
  CREATE_ROOT_COMMENT, CREATE_COMMENT, DELETE_COMMENT } from "../actions/types";

export default function(state = { post: {}, comments: [] }, action) {
  //console.log(action);
  switch(action.type) {
    case FETCH_POST:
    console.log('fetch post', action.payload.comments);
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
        for (let i = 0; i < newState.comments.length; i ++ ) {
          newState.comments[i].index = i;
          newState.comments[i].upCount = newState.comments[i].upvotes.length;
          newState.comments[i].downCount = newState.comments[i].downvotes.length;
          if (newState.comments[i].upvotes.indexOf(action.payload.user) === -1) {
            newState.comments[i].upVoted = false;
          } else {
            newState.comments[i].upVoted = true;
          }
          if (newState.comments[i].downvotes.indexOf(action.payload.user) === -1) {
            newState.comments[i].downVoted = false;
          } else {
            newState.comments[i].downVoted = true;
          }
        }
        return newState;
      case FETCH_POST_NONE:
        return action.payload;
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
        let cIndex4 = action.payload.index;
        let newState4 = JSON.parse(JSON.stringify(state));
        if (newState4.comments[cIndex4].upVoted) {
          newState4.comments[cIndex4].upCount --;
        } else if (newState4.comments[cIndex4].downVoted) {
          newState4.comments[cIndex4].upCount ++;
          newState4.comments[cIndex4].downCount --;
        } else {
          newState4.comments[cIndex4].upCount ++;
        }
        newState4.comments[cIndex4].score = action.payload.score;
        newState4.comments[cIndex4].upVoted = !newState4.comments[cIndex4].upVoted;
        newState4.comments[cIndex4].downVoted = false;
      return newState4;
      case DOWNVOTE_COMMENT:
        let cIndex5 = action.payload.index;
        let newState5 = JSON.parse(JSON.stringify(state));
        if (newState5.comments[cIndex5].downVoted) {
          newState5.comments[cIndex5].downCount --;
        } else if (newState5.comments[cIndex5].upVoted) {
          newState5.comments[cIndex5].downCount ++;
          newState5.comments[cIndex5].upCount --;
        } else {
          newState5.comments[cIndex5].downCount ++;
        }
        newState5.comments[cIndex5].score = action.payload.score;
        newState5.comments[cIndex5].downVoted = !newState5.comments[cIndex5].downVoted;
        newState5.comments[cIndex5].upVoted = false;
      return newState5;
      case CREATE_ROOT_COMMENT:
        let newState6 = JSON.parse(JSON.stringify(state));
        newState6.comments.unshift(action.payload);
        return newState6;

      case CREATE_COMMENT:
        let newState7 = JSON.parse(JSON.stringify(state));
        let checkIndex = (comment) => {
          return comment._id === action.payload.parent
        }
        let currentIndex = newState7.comments.findIndex(checkIndex);

        newState7.comments[currentIndex].comments.push(action.payload._id);
        newState7.comments.unshift(action.payload);
        return newState7;
      case DELETE_COMMENT:
        let newState8 = JSON.parse(JSON.stringify(state));
        newState8.comments[action.payload].content = "deleted by author";
        newState8.comments[action.payload].author = {
          name: "deleted",
        }
        newState8.comments[action.payload].deleted = true;
        return newState8;
      default:
      return state;
  }
}
