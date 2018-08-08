import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions'
import { Route, Link, Redirect } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import axios from 'axios'
import {
  Button,
  Container,
  Input,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

 class Home extends Component {

   componentDidMount() {

   }

   render() {
     let props = this.props;
     return (
       <div className="register">
       {props.auth ?
         <Redirect
           to={{
             pathname: "/profile"
           }}
         />
         : <div>
         <h1 style = {{color: 'white'}}> WELCOME </h1>
          <div className = "registerBox">
              <div>
              <Input className = "emailInput" focus icon="mail" iconPosition='left' type='email' placeholder='Email' />
              </div>
              <div>
              <Input className = "usernameInput" focus icon="user" iconPosition='left' type='text' placeholder='Create a username' />
              </div>
              <div>
              <Input className = "pwdInput" focus icon="lock" iconPosition='left' type='password' placeholder='Create a password' />
              </div>
            <div>
            <Button animated basic color = "teal">
              <Button.Content visible>Sign up!</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
            </div>
            <h3> OR </h3>
          </div>
          <div className = "loginBtnBox">
              <Button onClick = {() => this.props.history.push('/login')} color="teal">Login</Button>
          </div>
        </div>
     }
          </div>
     )
   }
}


export default Home;
