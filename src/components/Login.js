import React, { Component } from 'react'
import { Button, Header, Image, Icon, Modal, Input } from 'semantic-ui-react'

class Login extends Component {
  // hideFixedMenu = () => this.setState({ fixed: false }),
  // showFixedMenu = () => this.setState({ fixed: true })

  render() {
    return (
      <Modal trigger={<Button as='a' inverted={!this.props.fixed}>
        Log in
      </Button>}>
        <Modal.Header textAlign = 'center'>Login</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='/images/avatar/large/rachel.png' />
          <Modal.Description>
            <Header>Welcome!</Header>
            <div style = {{marginBottom: '4%'}}>
              <Input focus placeholder='Email' />
            </div>
            <div style = {{marginBottom: '4%'}}>
              <Input focus placeholder='Password' type = 'password'/>
            </div>
            <Button animated basic color = "teal">
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
}

export default Login;
