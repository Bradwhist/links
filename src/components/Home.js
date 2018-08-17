import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions'
import { Route, Link, Redirect } from 'react-router-dom'
import { signup } from '../actions'
import Login from './Login'
//import Feed from './Feed'
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
   constructor(props) {
     super(props);
     this.state = {
       email: '',
       name: '',
       password: '',
     };
   }

   setName = (e) => {
     this.setState({
       name: e.target.value
     })
   }
   setEmail = (e) => {
     this.setState({
       email: e.target.value
     })
   }
   setPassword = (e) => {
     this.setState({
       password: e.target.value
     })
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
            <img style = {{width: '15%', marginBottom: '3%'}} src = "https://upload.wikimedia.org/wikipedia/commons/0/08/Tealkobelogo.gif" alt="KOBE" />
              <div>
              <Input onChange= {e => this.setEmail(e)} className = "emailInput" focus icon="mail" iconPosition='left' type='email' placeholder='Email' />
              </div>
              <div>
              <Input onChange={e => this.setName(e)} className = "usernameInput" focus icon="user" iconPosition='left' type='text' placeholder='Create a username' />
              </div>
              <div>
              <Input onChange={e => this.setPassword(e)} className = "pwdInput" focus icon="lock" iconPosition='left' type='password' placeholder='Create a password' />
              </div>
            <div>
            <Button onClick = {this.signup} animated basic color = "teal">
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

   signup = () => {
   this.props.signup(this.state.name, this.state.email, this.state.password);
   this.setState({
     name: '',
     email: '',
     password: ''
   });
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (name, email, password) => dispatch(signup(name, email, password))
  };
}

export default connect(null, mapDispatchToProps)(Home);
