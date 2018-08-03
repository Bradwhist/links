import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import Login from './Login'
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
 const Home = (props) => (
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
                   <Button as='a' inverted={!props.fixed} primary={props.fixed} style={{ marginLeft: '0.5em' }}>
                     Sign Up
                   </Button>
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
                 content='WE ARE THE GREATEST'
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
)


Home.propTypes = {
    fixed: PropTypes.bool,
    onHideFixedMenu: PropTypes.func,
    onShowFixedMenu: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    fixed: state.fixed
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
