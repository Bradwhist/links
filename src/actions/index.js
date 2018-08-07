import axios from 'axios';

import { FETCH_USER, LOGIN, SIGNUP, LOGOUT } from './types';


// if redux-thunk sees that we're returning a function in
// an action creator instead of an action
// redux thunk will automatically call this function and pass in dispatch as an argument

export const fetchUser = () => async dispatch => {
  // we do not want to dispatch an action until this request is completed
  //console.log(localStorage)
  let user = localStorage.getItem('user');
  //console.log(JSON.parse(user).token);
  if (user) {
  let url = 'http://localhost:8080/api/checkUser/' + JSON.parse(user).token;
  //console.log(url);
  const res = await axios({
    method: 'get',
    url: url
  });
  //console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
} else {
  dispatch({ type: FETCH_USER, payload: null });
}
};

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
  console.log('RES in actions', res);
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
