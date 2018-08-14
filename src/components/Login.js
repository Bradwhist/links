import React, { Component } from 'react'
import { Button, Header, Image, Icon, Modal, Input, Message } from 'semantic-ui-react'
import { Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
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

    let {email, password} = this.state;

    return (
      <div className = "login">
        <div>
        <h1 style = {{color: '#0ccece'}}> Log-in</h1>
        <div className = "loginBox">
          <div>
            <Input
              onChange = {(e) => this.setEmail(e)}
              className = "emailInput"
              focus icon="mail"
              iconPosition='left'
              type='email'
              value={this.state.email}
              placeholder='Email' />
          </div>
          <div>
            <Input
               onChange = {(e) => this.setPassword(e)}
               className = "pwdInput" focus icon="lock"
               iconPosition='left'
               type='password'
               value={this.state.password}
               placeholder='Password' />
          </div>
          <div>
            <Button onClick = {this.login} animated basic color = "teal">
              <Button.Content visible>Login</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>

          </div>
          </div>
          <div className = "msgBox">
            <Message floating>
              <p> New to us?<Link to = '/'> Sign Up </Link></p>
            </Message>
          </div>
          </div>
        </div>
    )
  }

  login = () => {
  this.props.login(this.state.email, this.state.password);
  this.setState({
    email: '',
    password: ''
  });
  }
}

const mapStateToProps = ({auth}) => {
    return {
      auth,
    }
  }


const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
