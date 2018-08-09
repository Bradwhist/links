import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import Feed from './components/Feed'
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
      <div className="App">
        <Router>
          <Switch>
            <Route exact path = '/' component = {Home} />  {/*Register Component */}
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/feed' component = {Feed} />
            <PrivateRoute path = '/profile' component = {Profile} />
          </Switch>
       </Router>
      </div>
    );
  }
}


const mapStateToProps = ({auth}) => {
  return {
    auth,
  }
}

 export default connect(mapStateToProps, { fetchUser })(App);
