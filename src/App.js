import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
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
        <Switch>
          <Route exact path = '/' component = {Home} />
          <PrivateRoute path = '/profile' component = {Profile} />
        </Switch>
    </div>
  );
}
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      this.props.auth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const mapStateToProps = ({auth}) => {
  return {
    auth,
  }
}

 export default connect(mapStateToProps, { fetchUser })(App);
