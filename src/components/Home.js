import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, Redirect } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import axios from 'axios'
import {
  Button,
  Container,
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
     const user = localStorage.getItem('user');
    axios.get('http://localhost:8080/api/currentUser')
      .then(response => console.log(response))
      .catch(error => console.log(error))
   }

   render() {
     let props = this.props;
     return (
       <div>
       {this.props.auth ?
         <Redirect
           to={{
             pathname: "/profile"
           }}
         />
       :
       <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
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
             </Visibility>
           </Responsive>
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
