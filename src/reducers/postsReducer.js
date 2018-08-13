import { FETCH_POSTS, UPVOTE_POST, DOWNVOTE_POST } from "../actions/types";

export default function(state = [], action) {
  console.log(action);
  switch(action.type) {
    case FETCH_POSTS:
      let newState = action.payload.posts;
      for (var i = 0; i < newState.length; i ++ ) {
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
        let newState2 = [ ...state ];
        console.log(action.payload.score);
        newState2[action.payload.index].upVoted = !newState2[action.payload.index].upVoted;
        newState2[action.payload.index].downVoted = false;
        newState2[action.payload.index].score = action.payload.score;
      return newState2;
      case DOWNVOTE_POST:
        let newState3 = [ ...state ];
        console.log(action.payload.score);
        newState3[action.payload.index].downVoted = !newState3[action.payload.index].downVoted;
        newState3[action.payload.index].upVoted = false;
        newState3[action.payload.index].score = action.payload.score;
      return newState3;
      default:
      return state;
  }
}
