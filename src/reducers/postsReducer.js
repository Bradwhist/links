import { FETCH_POSTS, UPVOTE_POST, DOWNVOTE_POST } from "../actions/types";

export default function(state = [], action) {
  console.log('fetching posts', action);
  switch(action.type) {
    case FETCH_POSTS:
      let newState = action.payload.posts;
      for (var i = 0; i < newState.length; i ++ ) {
        newState[i].index = i;
        newState[i].upCount = newState[i].upvotes.length;
        newState[i].downCount = newState[i].downvotes.length;
        if (newState[i].upvotes.indexOf(action.payload.user) === -1) {
          newState[i].upVoted = false;
        } else {
          newState[i].upVoted = true;
        }
        if (newState[i].downvotes.indexOf(action.payload.user) === -1) {
          newState[i].downVoted = false;
        } else {
          newState[i].downVoted = true;
        }
      }
      // newState.sort((a, b) => a.score < b.score)
      return newState;
      // let postsArr = action.payload;
      // // helper scoring function
      // let scoreFn = (post) => {
      //   let x = 0;
      //   let y = 0;
      //   let vote = post.upvotes.length - post.downvotes.length;
      //
      //   if (vote === 0) {
      //     x = 1;
      //     y = 0;
      //   } else if (vote < 0){
      //     x = vote * -1;
      //     y = (post.createdAt.getTime() / 1000) * -1;
      //   } else {
      //     x = vote;
      //     y = post.createdAt.getTime() / 1000;
      //   }
      //   return 1 - (1 / (Math.sqrt(x) * (Math.E ** (y / 50000))));
      // }
      // //
      //
      // return postsArr.sort((a,b) => scoreFn(b) - scoreFn(a));
      case UPVOTE_POST:
        let cIndex = action.payload.index;
        let newState2 = [ ...state ];
        if (newState2[cIndex].downVoted) {
          newState2[cIndex].upCount ++;
          newState2[cIndex].downCount --;
        } else if (newState2[cIndex].upVoted) {
          newState2[cIndex].upCount --;
        } else {
          newState2[cIndex].upCount ++;
        }
        newState2[cIndex].upVoted = !newState2[cIndex].upVoted;
        newState2[cIndex].downVoted = false;
        newState2[cIndex].score = action.payload.score;
      return newState2;
      case DOWNVOTE_POST:
        let cIndex2 = action.payload.index;
        let newState3 = [ ...state ];
        if (newState3[cIndex2].upVoted) {
          newState3[cIndex2].upCount --;
          newState3[cIndex2].downCount ++;
        } else if (newState3[cIndex2].downVoted) {
          newState3[cIndex2].downCount --;
        } else {
          newState3[cIndex2].downCount ++;
        }
        newState3[cIndex2].downVoted = !newState3[cIndex2].downVoted;
        newState3[cIndex2].upVoted = false;
        newState3[cIndex2].score = action.payload.score;
      return newState3;
      default:
      return state;
  }
}
