import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
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
 const Profile = (props) => (
   <div>MEOW</div>
)


Profile.propTypes = {
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
)(Profile)
