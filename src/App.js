import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import Feed from './components/Feed'
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
            <Route exact path = '/profile' component = {Profile} />
          </Switch>
       </Router>
      </div>
      // <Router>
      // <div className="App">
      // {this.props.auth.loaded && this.props.logged ?
      //   <Switch>
      //   <Route exact path = '/feed' component={Feed} />
      //   {/* <Route exact path = '/createCategory' component={CreateCategory} /> */}
      //   {/* <Route exact path = '/post' component={Post} /> */}
      //   <Redirect exact from = '/' to = 'feed' />
      //   </Switch>
      //   :
      //   this.props.auth.loaded ?
      //     <Switch>
      //     <Redirect from='/feed' to='/'/>
      //     <Redirect from='/post' to='/'/>
      //     <Route exact path = '/' component = {Home} />
      //     </Switch>
      //     :
      //     <Route path = '/' render={() => <h1>Loading</h1>} />
      //   }
      // </div>
      // </Router>
    );
  }
}


const mapStateToProps = ({auth}) => {
  return {
    auth,
  }
}

 export default connect(mapStateToProps, { fetchUser })(App);
