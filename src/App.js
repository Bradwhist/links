import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Feed from './components/Feed'
import Post from './components/Post'
import Sub from './components/Sub'
import CreatePost from './components/CreatePost'
import CreateSub from './components/CreateSub'
import PrivateRoute from './components/PrivateRoute'
import { BrowserRouter as Router } from 'react-router-dom'
import {Button, Icon, Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment} from 'semantic-ui-react'
import { fetchUser } from './actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    console.log(this.props.auth);
    return (
      <Router>
      <div className="App">
      {this.props.auth.logged && this.props.auth.loaded ?
        <Switch>
        <Route exact path = '/feed' component={Feed} />
        <Route exact path = '/post/:id' render={(props) => <Post {...props} /> } />
        <Route exact path = '/createSub' component={CreateSub} />
        <Route exact path = '/createPost' component={CreatePost} />
        <Route exact path = '/sub/:id' component={Sub} />
        <Redirect exact from = '/' to = 'feed' />
        </Switch>
        :
        this.props.auth.loaded ?
          <Switch>
          <Redirect from='/feed' to='/'/>
          <Redirect from='/createPost' to='/'/>
          <Route exact path = '/' component = {Home} />
          </Switch>
          :
          <Route path = '/' render={() => <h1>Loading</h1>} />
        }
      </div>
      </Router>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth,
  }
}

 export default connect(mapStateToProps, { fetchUser })(App);
