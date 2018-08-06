import React, { Component } from 'react'
import { Button, Header, Image, Icon, Modal, Input } from 'semantic-ui-react'
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
      <Modal trigger={<Button as='a' inverted={!this.props.fixed}>
        Log in
      </Button>}>
        <Modal.Header style={{textAlign: 'center'}}>Login</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://www.xmple.com/wallpaper/checkered-black-blue-squares-1920x1080-c2-000000-6495ed-l-240-a-75-f-2.svg' />
          <Modal.Description>
            <Header>Welcome!</Header>
            <div style = {{marginBottom: '4%'}}>
              <Input focus placeholder='Email' onChange={e => this.setEmail(e)} value={email}/>
            </div>
            <div style = {{marginBottom: '4%'}}>
              <Input focus placeholder='Password' type = 'password' onChange={e => this.setPassword(e)} value={password}/>
            </div>
            <Button onClick = {this.login} animated basic color = "teal">
              <Button.Content visible>Login</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
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
const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}


export default connect(null, mapDispatchToProps)(Login);
