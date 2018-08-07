import React, { Component } from 'react'
import { Button, Header, Image, Icon, Modal, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { signup } from '../actions'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
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

    console.log(this.state);
    let {name, email, password} = this.state;

    console.log(this.state);
    return (
      <Modal trigger={<Button as='a' inverted={!this.props.fixed}>
        Signup
      </Button>}>
        <Modal.Header style={{textAlign: 'center'}}>Signup</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://www.xmple.com/wallpaper/checkered-black-blue-squares-1920x1080-c2-000000-6495ed-l-240-a-75-f-2.svg' />
          <Modal.Description>
            <Header>Welcome!</Header>
            <div style = {{marginBottom: '4%'}}>
              <Input focus placeholder='Name' onChange={e => this.setName(e)} value={name}/>
            </div>
            <div style = {{marginBottom: '4%'}}>
              <Input focus placeholder='Email' onChange={e => this.setEmail(e)} value={email}/>
            </div>
            <div style = {{marginBottom: '4%'}}>
              <Input focus placeholder='Password' type = 'password' onChange={e => this.setPassword(e)} value={password}/>
            </div>
            <Button onClick = {this.signup} animated basic color = "teal">
              <Button.Content visible>Signup</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
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


export default connect(null, mapDispatchToProps)(Signup);
