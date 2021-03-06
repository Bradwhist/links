import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Feed from './components/Feed'
import Explore from './components/Explore'
import AllPosts from './components/AllPosts'
import Profile from './components/Profile'
import Post from './components/Post'
import Subs from './components/Subs'
import Sub from './components/Sub'
import CreatePost from './components/CreatePost'
import CreateSub from './components/CreateSub'
import {Button, Icon, Container, Divider, Dropdown, Grid, Header, Image, List, Loader, Menu, Segment} from 'semantic-ui-react'
import { fetchUser, fetchSearch } from './actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchSearch();
  }
  render() {
    return (
      <Router>
      <div className="App">
        {/* <Route exact path = '/' component = {Home} />  {/*Register Component */}
        {/* <Route exact path = '/login' component = {Login} />
        <Route exact path = '/feed' component = {Feed} />
        <Route exact path = '/explore' component = {Explore} />
        <Route exact path = '/profile' component = {Profile} />
        <Route exact path = '/createSub' component={CreateSub} />
        <Route exact path = '/createPost' component={CreatePost} /> */}
      <Route exact path = '/' component = {Home} />
      <Route exact path = '/login' component = {Login} />

      {this.props.auth.logged && this.props.auth.loaded ?
        <Switch>
        <Route exact path = '/feed' component={Feed} />
        <Route exact path = '/allSubs' component={Explore} />
        <Route exact path = '/allPosts' component={AllPosts} />
        <Route exact path = '/profile' component= {Profile} />
        <Route exact path = '/post/:id/:commentId?' render={(props) => <Post {...props} /> } />
        <Route exact path = '/createSub' component={CreateSub} />
        <Route exact path = '/createPost' component={CreatePost} />
        <Route exact path = '/following' component={Subs} />
        <Route exact path = '/sub/:id' component={Sub} />
        <Route exact path = '/profile' component= {Profile} />
        <Redirect exact from = '/login' to = '/feed' />
        </Switch>
        :
        this.props.auth.loaded ?
          <Switch>
          //<Redirect from='/feed' to='/' />
          <Redirect from='/' to='/' />
          // <Redirect from='/createPost' to='/' />
          // <Redirect from='/post' to='/' />
          // <Redirect from='/createSub' to='/' />
          // <Redirect from='/sub' to='/' />
          // <Redirect from='/profile' to='/' />
          <Route exact path = '/' component = {Home} />
          </Switch>
        :
        <Route path = '/' render={() => <Loader active content="Loading" inline='centered' />} />
      }
        </div>
      </Router>
    );
  }
}
const mapStateToProps = ({auth, input}) => {
  return {
    auth,
    input
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchSearch: () => dispatch(fetchSearch())
  }
}

 export default connect(mapStateToProps, mapDispatchToProps)(App);
