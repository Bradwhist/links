import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
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
      <Switch>

      {this.props.auth ?
        <div>
        <Redirect from='/' to='/profile'/>
        <Route path = '/profile' component={Profile} />
        </div>
        :
        <div>
        <Redirect from='profile' to='/'/>
        <Route exact path = '/' component = {Home} />
        </div>
      }
      </Switch>
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
