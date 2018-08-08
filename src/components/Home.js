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
       <div>
       {props.auth ?
         <Redirect
           to={{
             pathname: "/profile"
           }}
         />
       : <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div style = {{border: '3px solid black', width: '50%', textAlign: 'center', borderRadius: '2.5%'}}>
            <h1> Welcome to the *insert app name here* </h1>
              <Input icon="mail" iconPosition='left' type='text' placeholder='Email' />
              <Input type='password' placeholder='Create a password' />
            <div>
            <Button animated basic color = "teal">
              <Button.Content visible>Sign up!</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </div>
            <h3> OR </h3>
            <Button color="teal">Login </Button>

          </div>
          {/* <Responsive minWidth={Responsive.onlyTablet.minWidth}> */}
          {/* <Visibility
            once={false}
           onBottomPassed={props.onShowFixedMenu}
           onBottomPassedReverse={props.onHideFixedMenu}
           >
             <Segment
               inverted
               textAlign='center'
               style={{ minHeight: 700, padding: '1em 0em' }}
               vertical
               >
                 <Menu
                   fixed={props.fixed ? 'top' : null}
                   inverted={!props.fixed}
                   pointing={!props.fixed}
                   secondary={!props.fixed}
                   size='large'
                   >
                     <Container>
                       <Menu.Item as='a' active>
                         Home
                       </Menu.Item>
                       <Menu.Item as='a'>Work</Menu.Item>
                       <Menu.Item as='a'>Company</Menu.Item>
                       <Menu.Item as='a'>Careers</Menu.Item>
                       <Menu.Item position='right'>
                         <Login fixed = {props.fixed}/>
                         <Signup fixed = {props.fixed}/>
                     </Menu.Item>
                   </Container>
                 </Menu>
                 <Container text>
                   <Header
                     as='h1'
                     content='DANKO'
                     inverted
                     style={{
                       fontSize: '4em',
                       fontWeight: 'normal',
                       marginBottom: 0,
                       marginTop: '3em',
                     }}
                   />
                   <Header
                     as='h2'
                     content='Do whatever you want when you want to.'
                     inverted
                     style={{
                       fontSize: '1.7em',
                       fontWeight: 'normal',
                       marginTop: '1.5em',
                     }}
                   />
                   <Button primary size='huge'>
                     Get Started
                     <Icon name='right arrow' />
                   </Button>
                 </Container>
               </Segment>
             </Visibility> */}
           {/* // </Responsive> */}
         </div>
     }
          </div>
     )
   }
}


Home.propTypes = {
    fixed: PropTypes.bool,
    onHideFixedMenu: PropTypes.func,
    onShowFixedMenu: PropTypes.func,
    auth: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    fixed: state.fixed,
    auth: state.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHideFixedMenu: () => dispatch({type: 'HIDE_FIXED'}),
    onShowFixedMenu: () => dispatch({type: 'SHOW_FIXED'})
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
