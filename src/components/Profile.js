import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { logout } from '../actions'
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
 class Profile extends Component {

   logout = () => {
   this.props.logout();
 }

   componentDidMount() {

   }

   render() {
     let props = this.props;
     return (
       <div>
       <button onClick={this.logout}>Logout</button>
       </div>
     )
   }
 }


Profile.propTypes = {
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(
    null,
    mapDispatchToProps
)(Profile)
