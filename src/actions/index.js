import axios from 'axios';

import { FETCH_USER, FETCH_SUBS, FETCH_POSTS, FETCH_POST, FETCH_SUB,
   LOGIN, SIGNUP, LOGOUT, SUBSCRIBE, SUBSCRIBE_FROM_SUB,
   CREATE_SUB, CREATE_POST, CREATE_COMMENT, CREATE_ROOT_COMMENT,
    UPVOTE_POST, DOWNVOTE_POST, UPVOTE_POST_FROM_SUB, DOWNVOTE_POST_FROM_SUB, UPVOTE_COMMENT, DOWNVOTE_COMMENT, POST, GET_INPUT } from './types';


// if redux-thunk sees that we're returning a function in
// an action creator instead of an action
// redux thunk will automatically call this function and pass in dispatch as an argument

//////////////////////////
// FETCH Actions
//Fetch User
export const fetchUser = () => async dispatch => {
  // we do not want to dispatch an action until this request is completed
  //console.log(localStorage)
  let user = localStorage.getItem('user');
  //console.log(JSON.parse(user).token);
  if (user) {
  const res = await axios.get('http://localhost:8080/api/checkUser/', {
    headers: { token: JSON.parse(localStorage.getItem('user')).token }
  }
  );
  //console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
} else {
  dispatch({ type: FETCH_USER, payload: null });
}
};
// Fetch Subs
export const fetchSubs = (userSub) => async dispatch => {
  console.log(userSub);
  const res = await axios.get('http://localhost:8080/api/sub', {
    headers: { token: JSON.parse(localStorage.getItem('user')).token }
  })
  dispatch({ type: FETCH_SUBS, payload: { subs: res.data, userSub: userSub }});
}
//Fetch Posts
export const fetchPosts = (userId) => async dispatch => {
  console.log('fetch posts action');
  const res = await axios.get('http://localhost:8080/api/post', {
    headers: { token: JSON.parse(localStorage.getItem('user')).token }
  })
  dispatch({ type: FETCH_POSTS, payload: { posts: res.data, user: userId }});
}
export const fetchPost = (userId, postId) => async dispatch => {
  const res = await axios.get('http://localhost:8080/api/post/byPost/' + postId, {
    headers: { token: JSON.parse(localStorage.getItem('user')).token }
  })
  const res2 = await axios.get('http://localhost:8080/api/comment/byPost/' + postId, {
    headers: { token: JSON.parse(localStorage.getItem('user')).token }
  })
  dispatch({ type: FETCH_POST, payload: { post: res.data, comments: res2.data, user: userId }});
}
// export const fetchCommentsFP = (postId) => async dispatch => {
//   //console.log('in action fetchcommentsfp')
//   const res = await axios.get('http://localhost:8080/api/comment/byPost/' + postId, {
//     headers: { token: JSON.parse(localStorage.getItem('user')).token }
//   })
//   dispatch({ type: FETCH_COMMENTS_FP, payload: res.data });
// }
// Fetch subs
export const fetchSub = (subId, match) => async dispatch => {
  let postArr = [];
  const res = await axios.get('http://localhost:8080/api/sub/bySub/' + subId, {
    headers: { token: JSON.parse(localStorage.getItem('user')).token }
  })
  console.log(res);
  for (var i = 0; i < res.data.posts.length; i ++) {
  postArr[i] = await axios.get('http://localhost:8080/api/post/byPost/' + res.data.posts[i], {
    headers: { token: JSON.parse(localStorage.getItem('user')).token }
  })
  postArr[i] = postArr[i].data;
  console.log(i, postArr[i]);
}
  dispatch({ type: FETCH_SUB, payload: { sub: res.data, posts: postArr, subscribed: match }});
}
//////////////////////////////////////////////////

export const login = (email, password) => async dispatch => {
try {
  const res = await axios({
    method: 'post',
    url: 'http://localhost:8080/auth/login',
    data: {
      email: email,
      password: password,
    },
  });
  localStorage.setItem('user', JSON.stringify(res.data));
  dispatch({ type: LOGIN, payload: res.data});
}
catch(err){console.log(err)}
}

export const signup = (name, email, password) => async dispatch => {
  try {
  const res = await axios.post('http://localhost:8080/auth/signup', {
    name: name,
    email: email,
    password: password,
  }
);
dispatch({ type: SIGNUP, payload: res.data });
}
catch(err){console.log(err)}
}

export const logout = () => async dispatch => {
  try {
    localStorage.removeItem('user');
      dispatch({ type: LOGOUT, payload: null });
  }
  catch(err){console.log(err)}
}
////////////////////////////
// POST add documents routes
//
//Create new category
export const createSub = (title, description, image) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:8080/api/sub', {
      title: title,
      description: description,
      image: image,
    },
    {
      headers: { token: JSON.parse(localStorage.getItem('user')).token }
    });
    dispatch({ type: CREATE_SUB, payload: res.data });
  }
  catch(err){console.log(err)}
}
//  create new post
export const createPost = (title, content, image, sub) => async dispatch => {
  try {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const res = await axios.post('http://localhost:8080/api/post', {
      title,
      content,
      image,
      sub,
    },
    {
      headers: { token }
    });
    dispatch({ type: CREATE_POST, payload: res.data });
  }
  catch(err){console.log(err)}
}

export const createComment = (content, commentId) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:8080/api/comment', {
      content: content,
      parent: commentId,
    },
  {
    headers: { token: JSON.parse(localStorage.getItem('user')).token }
  });
    dispatch({ type: CREATE_COMMENT, payload: res.data });
  }
  catch(err){console.log(err)}
}

export const createRootComment = (content, postId) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:8080/api/rootComment', {
      content: content,
      postId: postId,
    },
  {
    headers: { token: JSON.parse(localStorage.getItem('user')).token }
  });
    dispatch({ type: CREATE_ROOT_COMMENT, payload: res.data });
  }
  catch(err){console.log(err)}
}
///////////////////////////////
// Voting Actions
//////////////////
// Post voting
export const upvotePost = (postId, index) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:8080/api/vote/post/up', {
      post: postId
    }, {
      headers: { token: JSON.parse(localStorage.getItem('user')).token }
    })
    dispatch({ type: UPVOTE_POST , payload: { index: index, score: res.data } });
  }
  catch(err){console.log(err)}
}

export const downvotePost = (postId, index) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:8080/api/vote/post/down', {
      post: postId
    }, {
      headers: { token: JSON.parse(localStorage.getItem('user')).token }
    });
    dispatch({ type: DOWNVOTE_POST , payload: { index: index, score: res.data } });
  }
  catch(err){console.log(err)}
}
// vote on post from subs
export const upvotePostFromSub = (postId, index) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:8080/api/vote/post/up', {
      post: postId
    }, {
      headers: { token: JSON.parse(localStorage.getItem('user')).token }
    })
    dispatch({ type: UPVOTE_POST_FROM_SUB , payload: { index: index, score: res.data } });
  }
  catch(err){console.log(err)}
}

export const downvotePostFromSub = (postId, index) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:8080/api/vote/post/down', {
      post: postId
    }, {
      headers: { token: JSON.parse(localStorage.getItem('user')).token }
    });
    dispatch({ type: DOWNVOTE_POST_FROM_SUB , payload: { index: index, score: res.data } });
  }
  catch(err){console.log(err)}
}
//
// Comment voting
export const upvoteComment = (commentId, index) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:8080/api/vote/comment/up', {
      comment: commentId
    }, {
      headers: { token: JSON.parse(localStorage.getItem('user')).token }
    });
    dispatch({ type: UPVOTE_COMMENT, payload: {index: index, score: res.data } });
  }
  catch(err){console.log(err)}
}

export const downvoteComment = (commentId, index) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:8080/api/vote/comment/down', {
      comment: commentId
    }, {
      headers: { token: JSON.parse(localStorage.getItem('user')).token }
    });
    dispatch({ type: DOWNVOTE_COMMENT, payload: { index: index, score: res.data } });
  }
  catch(err){console.log(err)}
}

export const subscribe = (subId, i) => dispatch => {
  try {
    axios.post('http://localhost:8080/api/subscribe', {
      sub: subId
    }, {
      headers: {token: JSON.parse(localStorage.getItem('user')).token }
    });
    dispatch({ type: SUBSCRIBE, payload: i })
  }
  catch(err){console.log(err)}
}

export const subscribeFromSub = (subId) => dispatch => {
  try {
    console.log('in subscribe');
    axios.post('http://localhost:8080/api/subscribe', {
      sub: subId
    }, {
      headers: {token: JSON.parse(localStorage.getItem('user')).token }
    });
    dispatch({ type: SUBSCRIBE_FROM_SUB, payload: null })
  }
  catch(err){console.log(err)}
}

export const setInput = (inputVal) => async dispatch => {
  dispatch({type: GET_INPUT, value: inputVal});
}
