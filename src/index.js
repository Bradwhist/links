import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './reducers/index'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import reduxThunk from 'redux-thunk';



ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
, document.getElementById('root'));
registerServiceWorker();
