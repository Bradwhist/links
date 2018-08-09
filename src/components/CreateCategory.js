import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
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
 class CreateCategory extends Component {

   logout = () => {
   this.props.logout();
 }
  goProfile = () => {
    this.props.history.push('/feed')
  }

   componentDidMount() {

   }

   render() {
     //console.log('rendering profile', this.props);

     return (
       <div>
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.goProfile}>Back to profile...</button>

        </div>
      )
    }
  }


CreateCategory.propTypes = {
  logout: PropTypes.func,
};

const mapStateToProps = ({auth}) => {
  return {
    auth,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateCategory)
